import { CustomError } from "@/constants/custom-error";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //TODO
  // - groups api로 바꿀 것
  const { memberId } = req.query;
  const { capacity } = req.body;
  const requestUrl = `${API_END_POINT}/api/test/groups?member-id=${memberId}`;
  console.log(`API routes(/api/test/groups): ${requestUrl}`);

  try {
    const response = await axios({
      url: requestUrl,
      method: "post",
      data: {
        capacity,
      },
    });

    const groupId = response.headers.location.split("/")[4];

    res.status(200).json({ groupId });
  } catch (e) {
    console.error(e);
    if (axios.isAxiosError(e)) {
      const errorCode = e.response?.data.errorCode;
      const error = CustomError[errorCode];

      if (error) {
        res.status(error.status).json({
          error: error.message,
          status: error.status,
        });
      } else {
        res.status(e.response?.status || 400).json({
          error: "post create group api error",
          status: e.response?.status || 400,
        });
      }
    } else {
      res.status(400).json({ error: "NEXT API CALL ERROR", status: 400 });
    }
  }
}
