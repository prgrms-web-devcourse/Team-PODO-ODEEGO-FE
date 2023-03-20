import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const value = req.query.value;
  const requestUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${value}&category_group_code=SW8`;

  try {
    const { data } = await axios({
      method: "get",
      url: requestUrl,
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    });

    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ error: "kakao local search fail", status: 400 });
  }
}
