import { NextApiRequest, NextApiResponse } from "next";

async function getTokenFromKakao(authCode: string) {
  console.log(authCode);
  const tokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&code=${authCode}`;
  const response: any = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
  return response;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authCode } = req.body;

  console.log(authCode);

  const tokenResponse = await getTokenFromKakao(authCode);

  console.log(tokenResponse);

  res.status(200).json({ tokenResponse });
}
