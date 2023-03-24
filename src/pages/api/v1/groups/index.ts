import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { CustomError } from "@/constants/custom-error";

const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers;
  const requestUrl = `${API_END_POINT}/api/v1/groups`;

  try {
    const { data } = await axios({
      url: requestUrl,
      method: "get",
      headers: {
        Authorization: `Bearer ${authorization}`,
      },
    });

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    if (axios.isAxiosError(e)) {
      const errorCode = e.response?.data.errorCode;
      const error = CustomError[errorCode];

      if (error) {
        res.status(error.status).json({
          error: error.error ?? error.message,
          status: error.status,
          errorCode,
        });
      } else {
        res.status(e.response?.status || 400).json({
          error: "get groups All api error",
          status: e.response?.status || 400,
        });
      }
    } else {
      res.status(400).json({ error: "NEXT API CALL ERROR", status: 400 });
    }
  }
}
