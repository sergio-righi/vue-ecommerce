import { env } from '@server/utils';
import nodemailer from "nodemailer";
import { OAuth2Client } from 'google-auth-library';

const oauth2Client = new OAuth2Client(
  String(env.MAIL_CLIENTID),
  String(env.MAIL_SECRET),
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: String(env.MAIL_REFRESH)
});

const createTransporter = async () => {

  const accessToken = await oauth2Client.getAccessToken();

  const transport: any = {
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: String(env.MAIL_EMAIL),
      accessToken,
      clientId: String(env.MAIL_CLIENTID),
      clientSecret: String(env.MAIL_SECRET),
      refreshToken: String(env.MAIL_REFRESH)
    }
  }

  return nodemailer.createTransport(transport);
};

export default { createTransporter }