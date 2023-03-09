import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
function setCookie(name: string, value: string, options = {}) {
  const stringValue = JSON.stringify(value);

  console.log(stringValue);
  const cookieOptions = {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000), // expires in 7 days
    ...options,
  };

  const serializedCookie = serialize(name, stringValue, cookieOptions);

  return decodeURIComponent(serializedCookie);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { access_token } = req.body;
  console.log("TEST");
  if (!access_token) {
    return res.status(400).json({ error: "Token is missing" });
  }
  const cookie = setCookie("token", access_token);

  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ message: "Cookie has been set" });
}
