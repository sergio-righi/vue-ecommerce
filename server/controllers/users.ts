import { Response, Request } from "express";

import { UserModel } from "@/models";
import { UserService } from "@/services";
import { BaseController } from "./base.controller";

class UsersController extends BaseController {
  constructor() {
    super(UserModel);
  }

  async get(res: Response, req: Request) {
    const response = await UserService.get(req.body);
    res.status(response.status).json(response.data);
  }

  async add(res: Response, req: Request) {
    const response = await UserService.add(req.body);
    res.status(response.status).json(response.data);
  }

  async edit(res: Response, req: Request) {
    const { _id: id, ...document } = req.body;
    const response = await UserService.edit(id, document);
    res.status(response.status).json(response.data);
  }
}

export default new UsersController();
