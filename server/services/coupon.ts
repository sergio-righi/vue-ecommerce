import mongoose from "mongoose";
import { CouponModel } from "@server/models";

class CouponService {
  public readonly model: mongoose.Model<any>

  constructor() {
    this.model = CouponModel.model;
  }
}

export default new CouponService()