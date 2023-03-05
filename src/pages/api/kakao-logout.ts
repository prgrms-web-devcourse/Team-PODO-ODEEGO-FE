import { NextApiRequest, NextApiResponse } from "next";

async function getTokenFromKakao(logoutToken: string) {
  const tokenUrl = `https://kapi.kakao.com/v1/user/unlink`;
  const response: any = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${logoutToken}`,
    },
  }).then((res) => res.json());

  console.log(response);
  return response;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { logoutToken } = req.body;

  const tokenResponse = await getTokenFromKakao(logoutToken);
  res.status(200).json({ tokenResponse });
}
