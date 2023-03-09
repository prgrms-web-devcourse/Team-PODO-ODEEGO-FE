import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
function setCookie(name: string, value: string, options = {}) {
  const stringValue =
    typeof value === "object" ? JSON.stringify(value) : String(value);

  const cookieOptions = {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000), // expires in 7 days
    ...options,
  };

  const serializedCookie = serialize(name, stringValue, cookieOptions);

  return serializedCookie;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is missing" });
  }
  const cookie = setCookie("token", token);

  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ message: "Cookie has been set" });
}
