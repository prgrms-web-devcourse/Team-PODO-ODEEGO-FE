import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

const ERROR_OUT_OF_BOUND_S001 = "수도권 내의 범위로 출발지를 입력해주세요";
const ERROR_NOT_FOUND_404 = "ERROR: Not found";
const ERROR_INTERNAL_SERVER_500 = "네트워크 오류";

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
    if (axios.isAxiosError(e)) {
      const { response } = e;

      if (response && response.data && response.data.errorCode === "S001") {
        res
          .status(404)
          .send({ message: ERROR_OUT_OF_BOUND_S001, status: "S001" });
      } else if (response && response.status === 404) {
        res.status(404).send({ message: ERROR_NOT_FOUND_404, status: 404 });
      } else {
        res
          .status(500)
          .send({ message: ERROR_INTERNAL_SERVER_500, status: 500 });
      }
    }
  }
}
