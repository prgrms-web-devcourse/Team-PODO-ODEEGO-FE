// import axios from "axios";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { memberId } = req.body.value;
  const { groupId } = req.body.value;
  const { stationName } = req.body.value;
  const { lat } = req.body.value;
  const { lng } = req.body.value;
  const requestUrl = `${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/groups/${groupId}/host?memberId=${memberId}`;

  console.log(`api/v1/groups/startpoint/host${req.body}`);
  try {
    const { data } = await axios({
      method: "patch",
      url: requestUrl,
      data: {
        stationName: stationName,
        lat: lat,
        lng: lng,
      },
    });

    res.status(200).json(data);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const errorCode = e.response?.data.errorCode;

      if (errorCode === "M001") {
        res.status(400).json({
          error: "Member Not Found.",
          status: 404,
        });
      } else if (errorCode === "G001") {
        res.status(404).json({
          error: "Group Not Found.",
          status: 404,
        });
      } else if (errorCode === "G004") {
        res.status(400).json({
          error: "Group host is absent.",
          status: 400,
        });
      } else if (errorCode === "G006") {
        res.status(400).json({
          error: "Group Member's station is already defined.",
          status: 400,
        });
      } else if (errorCode === "S001") {
        res.status(404).json({
          error: "Station Not Found.",
          status: 404,
        });
      }
    } else {
      res.status(400).json({ error: "NEXT API CALL ERROR", status: 400 });
    }
  }
}
