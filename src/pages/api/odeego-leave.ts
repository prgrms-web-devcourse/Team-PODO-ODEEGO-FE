import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const odeegoLogoutUrl = `${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/members/leave`;

    const response = await axios.delete(odeegoLogoutUrl, {
      headers: {
        Authorization: `${req.headers.authorization}`,
        "Content-Type": "application/json",
      },
    });
    res.status(200).json(response.data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
}
