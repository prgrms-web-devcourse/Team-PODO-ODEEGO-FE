export default async function (req: any, res: any) {
  const { cookies } = req;

  const jwt = cookies.token;

  console.log(jwt);
  return res.json({ jwt });
}
