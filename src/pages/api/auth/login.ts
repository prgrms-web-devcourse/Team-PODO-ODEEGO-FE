import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
function setCookie(name: string, value: string, options = {}) {
  try {
    const cookieOptions = {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000), // expires in 7 days
      ...options,
    };
    const stringValue = JSON.stringify(value);
    const serializedCookie = serialize(name, stringValue, cookieOptions);

    return decodeURIComponent(serializedCookie);
  } catch (err) {
    throw new Error((err as Error).message);
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { access_token } = req.body;

  // 토큰자체가 안나오고있네>?
  if (!access_token) {
    return res.status(400).json({ error: "Token is missing" });
  }
  const cookie = setCookie("token", access_token);
  console.log("TEST@@@@@@@@@@@@@@@@@@@@@");
  console.log(cookie);
  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ message: "Cookie has been set" });
}
