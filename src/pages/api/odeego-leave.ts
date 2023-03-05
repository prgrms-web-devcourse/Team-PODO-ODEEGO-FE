import { NextApiRequest, NextApiResponse } from "next";

async function getTokenFromKakao(odeegoToken: string) {
  const tokenUrl = `https://odeego.shop/api/v1/members/leave`;
  const response: any = await fetch(tokenUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${odeegoToken}`,
    },
  }).then((res) => res.json());
  console.log("Test용");
  console.log(response);
  return response;
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { odeegoToken } = req.body;
  const tokenResponse = await getTokenFromKakao(odeegoToken);
  res.status(200).json({ tokenResponse });
}
