import auth from 'jsonwebtoken';

const verifyRefresh = (email: string, token: string): boolean => {
  try {
    const decoded: any = auth.verify(token, String(process.env.JWT_REFRESH));
    return decoded.email === email;
  } catch (error) {
    return false;
  }
}

export default verifyRefresh;