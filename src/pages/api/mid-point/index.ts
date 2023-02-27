import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //TODO
  // - mid-point api로 바꿀 것
  const requestUrl = `${API_END_POINT}/api/hello/body`;
  console.log(`API routes(/api/hello body): ${requestUrl}`);
  console.log(req.body);

  try {
    const { data } = await axios({
      url: requestUrl,
      method: "post",
      data: {
        message: "kal",
      },
    });

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(400).json("ERROR");
  }
}
