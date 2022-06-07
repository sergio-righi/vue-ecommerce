import { google } from "googleapis";
import nodemailer from "nodemailer";
import { mail } from "@server/config";

const oauth2Client = new google.auth.OAuth2(
  mail.dev.clientId,
  mail.dev.secret,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: mail.dev.refresh
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
      user: mail.dev.email,
      accessToken,
      clientId: mail.dev.clientId,
      clientSecret: mail.dev.secret,
      refreshToken: mail.dev.refresh
    }
  }

  return nodemailer.createTransport(transport);
};

export default { createTransporter }