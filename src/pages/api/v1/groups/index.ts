import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

const ERROR_NOT_FOUND_404 = "ERROR: Not found";
const ERROR_INTERNAL_SERVER_500 = "네트워크 오류";
const ERROR_MEMBER_ID_NOT_FOUND_400 = "토큰이 존재하지 않습니다.";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //TODO
  // - groups api로 바꿀 것
  const { memberId } = req.query;
  const requestUrl = `${API_END_POINT}/api/v1/groups?member-id=${memberId}`;
  console.log(`API routes(/api/v1/group?member-id=): ${requestUrl}`);

  try {
    const { data } = await axios({
      url: requestUrl,
      method: "get",
    });

    console.log(data);

    res.status(200).json(data);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { response } = e;
      console.log(e);
      if (response && response.data && response.data.errorCode === "M001") {
        res
          .status(404)
          .send({ message: ERROR_MEMBER_ID_NOT_FOUND_400, status: 404 });
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
