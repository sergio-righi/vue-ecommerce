import mongoose from "mongoose";
import { AuthorModel } from "@/models";

class AuthorService {
  public readonly model: mongoose.Model<any>

  constructor() {
    this.model = AuthorModel.model;
  }
}

export default new AuthorService()