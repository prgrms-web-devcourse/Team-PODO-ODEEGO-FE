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
      throw new Error("Internal server error");
    }

    const pt = new Stream.PassThrough();

    Stream.pipeline(rStream, pt, (err) => {
      if (err) throw new Error("Internal server error");
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
