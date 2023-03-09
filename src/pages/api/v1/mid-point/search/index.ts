import { CustomError } from "@/constants/custom-error";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestUrl = `${API_END_POINT}/api/v1/mid-points/search`;
  const addressList = req.body;
  console.log(`API routes(/api/v1/mid-points/search): ${requestUrl}`);
  console.log(addressList);

  try {
    const { data } = await axios({
      url: requestUrl,
      method: "post",
      data: {
        stations: [...addressList.stations],
      },
    });

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
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
