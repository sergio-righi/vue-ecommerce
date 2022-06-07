import mongoose from "mongoose";
import { AuthorModel } from "@server/models";

class AuthorService {
  public readonly author: AuthorModel
  public readonly model: mongoose.Model<any>

  constructor() {
    this.author = new AuthorModel();
    this.model = this.author.model;
  }
}

export default new AuthorService()