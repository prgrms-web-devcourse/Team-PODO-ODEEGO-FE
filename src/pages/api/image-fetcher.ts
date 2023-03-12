// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { Stream } from "stream";
import { unescape } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { url } = req.query;

    if (!url || typeof url !== "string") {
      return res
        .status(400)
        .json({ message: "Missing image url in request-query" });
    }
    const rStream = (await fetch(unescape(url)).then(
      (resp) => resp.body
    )) as NodeJS.ReadableStream;

    if (!rStream) {
      /* Failed to fetch
     We could either redirect to the url URL (or some other 
    fallback url e.g. res.redirect(https://example.com/someImage.png)
    or error: */
      return res.status(500).json({ message: "Internal server error" });
    }

    const pt = new Stream.PassThrough();

    Stream.pipeline(rStream, pt, (err) => {
      if (err)
        return res.status(500).json({ message: "Internal server error" });
    });

    pt.pipe(res);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

export const config = {
  api: {
    externalResolver: true,
    responseLimit: false,
  },
};
