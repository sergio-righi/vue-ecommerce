import { UserModel } from "@server/models";
import { UserService } from "@server/services";
import { BaseController } from "./base.controller";

class UsersController extends BaseController {
  constructor() {
    super(new UserModel());
  }
}

export default new UsersController();