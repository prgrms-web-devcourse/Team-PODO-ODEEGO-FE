import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

const ERROR_ALREADY_EXIST_MEETING_ROOM_400 = "이미 생성된 모임이 있습니다.";
const ERROR_NOT_FOUND_404 = "ERROR: Not found";
const ERROR_INTERNAL_SERVER_500 = "네트워크 오류";

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
      const { response } = e;

      if (response && response.status === 400) {
        res
          .status(400)
          .send({ message: ERROR_ALREADY_EXIST_MEETING_ROOM_400, status: 400 });
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
