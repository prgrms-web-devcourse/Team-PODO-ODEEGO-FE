import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

const ERROR_NOT_FOUND_404 = "ERROR: Not found";
const ERROR_INTERNAL_SERVER_500 = "네트워크 오류";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { stationName, category } = req.query;
  const requestUrl = `${API_END_POINT}/api/v1/places?station-name=${stationName}${
    category ? `&category=${category}` : ""
  }`;
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
      const { response } = e;

      if (response && response.status === 404) {
        res.status(404).send({ message: ERROR_NOT_FOUND_404, status: 404 });
      } else {
        res
          .status(500)
          .send({ message: ERROR_INTERNAL_SERVER_500, status: 500 });
      }
    }
  }
}
