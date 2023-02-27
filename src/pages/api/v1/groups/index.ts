import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //TODO
  // - groups api로 바꿀 것
  const requestUrl = `${API_END_POINT}/api/hello/simple`;
  console.log(`API routes(/api/hello simple): ${requestUrl}`);
  console.log(req.body);

  try {
    const { data } = await axios({
      url: requestUrl,
      method: "get",
    });

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(400).json("ERROR");
  }
}
