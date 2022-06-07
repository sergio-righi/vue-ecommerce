import mongoose from "mongoose";
import { UserModel } from "@server/models";

class UserService {
  public readonly user: UserModel
  public readonly model: mongoose.Model<any>

  constructor() {
    this.user = new UserModel();
    this.model = this.user.model;
  }
}

export default new UserService()