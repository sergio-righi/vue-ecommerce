import { Response, Request } from "express";
import { BookModel } from "@/models";
import { BookService } from "@/services";
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