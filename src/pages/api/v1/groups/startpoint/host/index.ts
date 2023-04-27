// import axios from "axios";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { CustomError } from "@/constants/custom-error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { groupId, stationName, lat, lng } = req.body.value;
  const header = req.headers;

  const requestUrl = `${process.env.NEXT_PUBLIC_API_END_POINT_ODEEGO}/api/v1/groups/${groupId}/host`;

  try {
    const { data } = await axios({
      method: "patch",
      url: requestUrl,
      headers: {
        Authorization: `Bearer ${header.authorization}`,
      },
      data: {
        stationName: stationName,
        lat: lat,
        lng: lng,
      },
    });

    res.status(200).json(data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorCode = err.response?.data.errorCode;

      if (CustomError[errorCode]) {
        res.status(CustomError[errorCode].status).json({
          error: CustomError[errorCode].message,
          status: CustomError[errorCode].status,
          errorCode: errorCode,
        });
      } else if (err.response?.status) {
        res.status(err.response?.status).json({
          error: "api/v1/groups/startpoint/host patch fail",
          status: err.response?.status,
          errorCode: errorCode,
        });
      }
    } else {
      res
        .status(400)
        .json({ error: "Unkwon Error In NEXT API CALL ERROR", status: 400 });
    }
  }
}
