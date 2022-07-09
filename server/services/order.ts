import mongoose from "mongoose";
import { crypto } from "@/utils";
import { OrderModel } from "@/models";
import { ServiceType } from "@/interfaces";

class OrderService {
  public readonly model: mongoose.Model<any>;

  constructor() {
    this.model = OrderModel.model;
  }

  async allWithBooks(query: any): Promise<ServiceType> {
    try {
      const response = await this.model
        .find(query)
        .populate({
          path: "books.bookId",
          select: "-description",
          model: "Book",
        })
        .exec();
      return { status: 200, data: response } as ServiceType;
    } catch (err) {
      return { status: 500 } as ServiceType;
    }
  }

  async add(document: any): Promise<ServiceType> {
    try {
      document = this._runEncrypt(document);
      const response = await this.model.create(document);
      return { status: 200, data: response } as ServiceType;
    } catch (err) {
      return { status: 500 } as ServiceType;
    }
  }

  _runEncrypt(document: any) {
    if (!document) return document;
    document.payment = {
      ...document.payment,
      cvv: null,
      number: crypto.encrypt(document.payment.number),
    };
    return document;
  }
}

export default new OrderService();
