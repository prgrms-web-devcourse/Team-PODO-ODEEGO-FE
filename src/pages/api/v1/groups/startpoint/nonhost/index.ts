// import axios from "axios";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { CustomError } from "@/constants/custom-error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(`api/v1/groups/startpoint/nonhost`);
  const { memberId } = req.body.value;
  const { groupId } = req.body.value;
  const { stationName } = req.body.value;
  const { lat } = req.body.value;
  const { lng } = req.body.value;

  const requestUrl = `${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/groups/${groupId}/group-members?memberId=${memberId}`;

  try {
    const { data } = await axios.post(
      requestUrl,
      {
        stationName: stationName,
        lat: lat,
        lng: lng,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
