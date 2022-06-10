import { AuthorModel } from "@server/models";
import { BaseController } from "./base.controller";

class AuthorsController extends BaseController {
  constructor() {
    super(AuthorModel);
  }
}

export default new AuthorsController();