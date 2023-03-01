import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //TODO
  // - groups api로 바꿀 것
  const { nickname } = req.query;
  const requestUrl = `${API_END_POINT}/api/test/members?nickname=${nickname}`;
  console.log(`API routes(/api/test/members?nickname=): ${requestUrl}`);

  try {
    const response = await axios({
      url: requestUrl,
      method: "post",
    });

    const memberId = response.headers.location.split("/")[4];

    res.status(200).json({ memberId });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Error", status: 400 });
  }
}
