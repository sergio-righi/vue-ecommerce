import mongoose from "mongoose";
import { OrderModel } from "@server/models";
import { ServiceType } from "@server/interfaces";

class OrderService {
  public readonly model: mongoose.Model<any>

  constructor() {
    this.model = OrderModel.model;
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