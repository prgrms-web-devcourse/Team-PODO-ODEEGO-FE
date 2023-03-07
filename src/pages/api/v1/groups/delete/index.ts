import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //TODO
  // - groups api로 바꿀 것
  const { groupId } = req.query;
  const requestUrl = `${process.env.NEXT_PUBLIC_API_END_POINT}/api/test/groups/${groupId}`;

  try {
    const { data } = await axios({
      url: requestUrl,
      method: "delete",
    });

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Error", status: 400 });
  }
}
