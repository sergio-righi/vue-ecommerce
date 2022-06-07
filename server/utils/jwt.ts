import auth from 'jsonwebtoken';
import { jwt } from "@server/config";

const verifyRefresh = (email: string, token: string): boolean => {
  try {
    const decoded: any = auth.verify(token, jwt.refresh);
    return decoded.email === email;
  } catch (error) {
    return false;
  }
}

export default verifyRefresh;