import auth from 'jsonwebtoken';
import { env } from "@server/utils";

const verifyRefresh = (email: string, token: string): boolean => {
  try {
    const decoded: any = auth.verify(token, String(env.JWT_REFRESH));
    return decoded.email === email;
  } catch (error) {
    return false;
  }
}

export default verifyRefresh;