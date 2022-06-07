import { Request, Response } from 'express'
import { TokenModel } from "@server/models";
import { TokenService } from "@server/services";
import { BaseController } from "./base.controller";

class TokensController extends BaseController {
  constructor() {
    super(new TokenModel());
  }

  async done(res: Response, req: Request) {
    const { id } = req.params;
    const response = await TokenService.access(id, true);
    res.status(response.status).json(response.data);
  };

  async undone(res: Response, req: Request) {
    const { id } = req.params;
    const response = await TokenService.access(id, false);
    res.status(response.status).json(response.data);
  };

  async reset(res: Response, req: Request) {
    const { id } = req.params;
    const response = await TokenService.reset(id, req.body);
    res.status(response.status).json(response.data);
  };
}

export default new TokensController();