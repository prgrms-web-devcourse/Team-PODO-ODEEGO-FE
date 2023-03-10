import { CustomError } from "@/constants/custom-error";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //TODO
  // - groups api로 바꿀 것
  const { groupId } = req.query;
  const { authorization } = req.headers;
  const requestUrl = `${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/groups/${groupId}`;

  try {
    const { data } = await axios({
      url: requestUrl,
      method: "delete",
      headers: {
        Authorization: `Bearer ${authorization}`,
      },
    });

    res.status(200).json(data);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const errorCode = e.response?.data.errorCode;

      res.status(CustomError[errorCode].status).json({
        error: CustomError[errorCode].message,
        status: CustomError[errorCode].status,
      });
    } else {
      res.status(400).json({ error: "NEXT API CALL ERROR", status: 400 });
    }
  }
}
