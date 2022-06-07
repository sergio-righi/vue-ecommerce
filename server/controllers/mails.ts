import { Request, Response } from 'express'
import { MailService } from "@server/services";

class MailsController {
  async verificationCode(res: Response, req: Request) {
    const response = await MailService.verificationCode(req.body)
    res.status(response.status)
  }

  async forgetPassword(res: Response, req: Request) {
    const response = await MailService.forgetPassword(req.body)
    res.status(response.status)
  }
}

export default new MailsController();