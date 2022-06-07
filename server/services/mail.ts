import { file, mail } from "@server/utils"
import { ServiceType } from "@server/interfaces";

class MailService {

  /**
   * create and send a verification code email
   * @param options from, to, subject and content
   * @returns 
   */

  async verificationCode(options: any): Promise<ServiceType> {
    const html = file.readAndReplace('verification_code.html', options.content);
    return await this.send({
      ...options.mail,
      html
    });
  }

  /**
   * create and send a reset password email
   * @param options  from, to, subject and content
   * @returns 
   */

  async forgetPassword(options: any): Promise<ServiceType> {
    const html = file.readAndReplace('forget_password.html', options.content);
    return await this.send({
      ...options.mail,
      html
    });
  }

  /**
   * send and email using the transporter
   * @param options the content of the email
   * @returns 
   */

  async send(options: any): Promise<ServiceType> {
    try {
      const transporter = await mail.createTransporter();
      await transporter.sendMail(options);
      transporter.close();
      return { status: 200 } as ServiceType;
    } catch (err) {
      return { status: 500 } as ServiceType;
    }
  };
}

export default new MailService()