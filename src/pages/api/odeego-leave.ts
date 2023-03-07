import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const odeegoLogoutUrl = `${process.env.NEXT_PUBLIC_API_END_POINT_ODEEGO}/api/v1/members/leave`;

  console.log(req.headers.authorization);
  try {
    const response = await axios.delete(odeegoLogoutUrl, {
      headers: {
        Authorization: `Bearer ${req.headers.authorization}`,
        "Content-Type": "application/json",
      },
    });
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
