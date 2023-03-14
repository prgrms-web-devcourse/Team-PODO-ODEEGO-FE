import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { CustomError } from "@/constants/custom-error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const RequestUrl = `${process.env.NEXT_PUBLIC_API_END_POINT_ODEEGO}/api/v1/members/default-station`;
  const header = req.headers;
  try {
    const { data } = await axios({
      method: "get",
      url: RequestUrl,
      headers: {
        Authorization: `Bearer ${header.authorization}`,
      },
    });

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      const errorCode = err.response?.data.errorCode;
      const error = CustomError[errorCode];

      if (error) {
        res.status(error.status).json({
          error: error.message,
          status: error.status,
        });
      } else {
        res.status(err.response?.status || 400).json({
          error: "mid-point api error",
          status: err.response?.status || 400,
        });
      }
    } else {
      res.status(400).json({ error: "NEXT API CALL ERROR", status: 400 });
    }
  }
}
