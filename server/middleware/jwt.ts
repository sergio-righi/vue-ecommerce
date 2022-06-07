import auth from "jsonwebtoken";
import { jwt } from "@server/config";

export default (req: any, _: any, next: any) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    const error: any = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  const token = authorization.split(" ")[1];

  let decodedToken: any;
  try {
    decodedToken = auth.verify(token, jwt.access);
  } catch (err: any) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error: any = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};