import { Context } from '@nuxt/types'

class MailRepository {
  private readonly context: Context
  static controllerName: string = "/mails"

  constructor(context: Context) {
    this.context = context;
  }

  async verificationCode(options: any) {
    await this.context.$axios.post(`${MailRepository.controllerName}/verification-code`, options);
  }

  async forgetPassword(options: any) {
    await this.context.$axios.post(`${MailRepository.controllerName}/forget-password`, options);
  }
};

export { MailRepository }