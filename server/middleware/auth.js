const dev = process.env.NODE_ENV !== "production";

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secretKey =
    process.env.SECRET_KEY || "D2GZvPTl8c5GAQX8ZyvOlq72Jnukl5Tu";
  try {
    if (dev || (token && token === secretKey)) {
      next();
    } else {
      throw 401;
    }
  } catch (err) {
    if (err === 401) res.status(401);
    res.end();
  }
};
