import { AuthorModel } from "@/models";
import { BaseController } from "./base.controller";

class AuthorsController extends BaseController {
  constructor() {
    super(AuthorModel);
  }
}

export default new AuthorsController();