import { AuthorModel } from "@server/models";
import { AuthorService } from "@server/services";
import { BaseController } from "./base.controller";

class AuthorsController extends BaseController {
  constructor() {
    super(new AuthorModel());
  }
}

export default new AuthorsController();