import { Response, Request } from "express";
import { OrderModel } from "@/models";
import { OrderService } from "@/services";
import { BaseController } from "./base.controller";

class OrdersController extends BaseController {
  constructor() {
    super(OrderModel);
  }

  async allWithBooks(res: Response, req: Request) {
    const response = await OrderService.allWithBooks(req.body)
    res.status(response.status).json(response.data);
  }

  async add(res: Response, req: Request) {
    const response = await OrderService.add(req.body);
    res.status(response.status).json(response.data);
  }
}

export default new OrdersController();