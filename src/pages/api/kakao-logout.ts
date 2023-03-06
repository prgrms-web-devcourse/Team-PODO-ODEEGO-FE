import { NextApiRequest, NextApiResponse } from "next";

async function getTokenFromKakao(logoutToken: string) {
  const tokenUrl = `https://kapi.kakao.com/v1/user/unlink`;

  try {
    const response: NextApiResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${logoutToken}`,
      },
    }).then((res) => res.json());

    return response;
  } catch (err) {
    throw new Error((err as Error).message);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { logoutToken } = req.body;

  const tokenResponse = await getTokenFromKakao(logoutToken);
  res.status(200).json({ tokenResponse });
}
