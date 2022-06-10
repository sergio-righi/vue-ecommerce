import { Response, Request } from "express";
import { OrderModel } from "@server/models";
import { OrderService } from "@server/services";
import { BaseController } from "./base.controller";

class OrdersController extends BaseController {
  constructor() {
    super(OrderModel);
  }

  async allWithBooks(res: Response, req: Request) {
    const response = await OrderService.allWithBooks(req.body)
    res.status(response.status).json(response.data);
  }
}

export default new OrdersController();