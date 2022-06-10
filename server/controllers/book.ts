import { Response, Request } from "express";
import { BookModel } from "@server/models";
import { BookService } from "@server/services";
import { BaseController } from "./base.controller";

class BooksController extends BaseController {
  constructor() {
    super(BookModel);
  }

  async findWithAuthors(res: Response, req: Request) {
    const response = await BookService.findWithAuthors(req.body)
    res.status(response.status).json(response.data);
  }
}

export default new BooksController();