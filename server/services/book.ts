import mongoose from "mongoose";
import { BookModel } from "@server/models";
import { ServiceType } from "@server/interfaces";

class BookService {
  public readonly model: mongoose.Model<any>

  constructor() {
    this.model = BookModel.model;
  }

  async findWithAuthors(query: any): Promise<ServiceType> {
    try {
      const response = await this.model.findOne(query).populate({
        path: 'authors',
        model: 'Author'
      }).exec();
      return { status: 200, data: response } as ServiceType;
    } catch (err) {
      return { status: 500 } as ServiceType;
    }
  }
}

export default new BookService()