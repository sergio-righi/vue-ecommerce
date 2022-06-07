import { Context } from '@nuxt/types'

import { MailRepository } from "@/repository";

class MailService {
  private readonly i18n: any
  private readonly $auth: any
  private readonly repository: any

  constructor(context: any) {
    this.i18n = context.i18n;
    this.$auth = context.$auth;
    this.repository = new MailRepository(context);
  }

  verificationCode(code: string) {
    if (!code) return;

    const options = {
      mail: {
        from: 'contadesenvolvedor@gmail.com',
        to: this.$auth.user.person.email,
        subject: this.i18n.t('mail.verification_code.subject'),
      },
      content: {
        greeting: this.i18n.t('mail.verification_code.greeting', { name: this.$auth.user.person.name }),
        header: this.i18n.t('mail.verification_code.header'),
        code,
        description: this.i18n.t('mail.verification_code.description'),
      },
    };

    this.repository.verificationCode(options);
  }

  forgetPassword(email: string, token: string) {
    if (!email || !token) return;

    const options = {
      mail: {
        from: 'contadesenvolvedor@gmail.com',
        to: email,
        subject: this.i18n.t('mail.forget_password.subject'),
      },
      content: {
        header: this.i18n.t('mail.forget_password.header'),
        subheader: this.i18n.t('mail.forget_password.subheader'),
        button: this.i18n.t('mail.forget_password.button'),
        href: `http://localhost:3000/forget_password?token=${token}`,
        description: this.i18n.t('mail.forget_password.description'),
      },
    };

    this.repository.forgetPassword(options);
  }
}

export { MailService }