import { CustomError } from "@/constants/custom-error";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

// const ERROR_ALREADY_EXIST_MEETING_ROOM_400 = "이미 생성된 모임이 있습니다.";
// const ERROR_CAPACITY_OUT_OF_BOUND_400 = "모임 생성 인원이 초과되었습니다.";
// const ERROR_NOT_FOUND_404 = "ERROR: Not found";
// const ERROR_INTERNAL_SERVER_500 = "네트워크 오류";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { capacity } = req.body;
  const { authorization } = req.headers;
  const requestUrl = `${API_END_POINT}/api/v1/groups`;

  try {
    const response = await axios({
      url: requestUrl,
      method: "post",
      data: {
        capacity,
      },
      headers: {
        Authorization: `Bearer ${authorization}`,
      },
    });

    const groupId = response.headers.location.split("/")[4];

    res.status(200).json({ groupId });
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
