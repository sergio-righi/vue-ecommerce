import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_ACCESS: process.env.JWT_ACCESS,
  JWT_REFRESH: process.env.JWT_REFRESH,
  MAIL_EMAIL: process.env.MAIL_EMAIL,
  MAIL_CLIENTID: process.env.MAIL_CLIENTID,
  MAIL_SECRET: process.env.MAIL_SECRET,
  MAIL_REFRESH: process.env.MAIL_REFRESH
};