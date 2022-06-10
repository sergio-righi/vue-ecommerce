import mongoose from "mongoose";
import { UserModel } from "@server/models";

class UserService {
  public readonly model: mongoose.Model<any>

  constructor() {
    this.model = UserModel.model;
  }
}

export default new UserService()