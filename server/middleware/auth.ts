const dev = process.env.NODE_ENV !== "production";

export default (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization;
    const secretKey =
      process.env.SECRET_KEY || "D2GZvPTl8c5GAQX8ZyvOlq72Jnukl5Tu";
    if (dev || (token && token === secretKey)) next();
    else throw new Error("401")
  } catch (err) {
    err === 401 ? res.status(401) : res.end();
  }
};