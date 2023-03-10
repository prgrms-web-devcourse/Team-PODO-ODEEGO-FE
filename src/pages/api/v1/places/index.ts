import { CustomError } from "@/constants/custom-error";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { stationName, category, page, size } = req.query;
  const categoryQuery = category ? `&category=${category}` : "";
  const sizeQuery = size ? `&size=${size}` : "";
  const requestUrl = `${API_END_POINT}/api/v1/places?station-name=${stationName}${categoryQuery}&page=${page}${sizeQuery}`;

  console.log(
    `API routes(/api/v1/places?station-name=&category=): ${requestUrl}`
  );

  try {
    const { data } = await axios({
      url: requestUrl,
      method: "get",
    });

    res.status(200).json(data);
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
          error: "place get api call error",
          status: e.response?.status || 400,
        });
      }
    } else {
      res.status(400).json({ error: "NEXT API CALL ERROR", status: 400 });
    }
  }
}
