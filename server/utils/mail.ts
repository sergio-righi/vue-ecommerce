import { google } from "googleapis";
import nodemailer from "nodemailer";

const oauth2Client = new google.auth.OAuth2(
  String(process.env.MAIL_CLIENTID),
  String(process.env.MAIL_SECRET),
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: String(process.env.MAIL_REFRESH)
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
      user: String(process.env.MAIL_EMAIL),
      accessToken,
      clientId: String(process.env.MAIL_CLIENTID),
      clientSecret: String(process.env.MAIL_SECRET),
      refreshToken: String(process.env.MAIL_REFRESH)
    }
  }

  return nodemailer.createTransport(transport);
};

export default { createTransporter }