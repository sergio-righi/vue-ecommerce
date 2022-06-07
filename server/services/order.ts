import mongoose from "mongoose";
import { BookModel, OrderModel } from "@server/models";
import { ServiceType } from "@server/interfaces";

class OrderService {
  public readonly order: OrderModel
  public readonly model: mongoose.Model<any>

  constructor() {
    this.order = new OrderModel();
    this.model = this.order.model;
  }

  async allWithBooks(query: any): Promise<ServiceType> {
    try {
      const response = await this.model.find(query).populate({
        path: 'books.bookId',
        select: '-description',
        model: 'Book'
      }).exec();
      return { status: 200, data: response } as ServiceType;
    } catch (err) {
      return { status: 500 } as ServiceType;
    }
  }
}

export default new OrderService()