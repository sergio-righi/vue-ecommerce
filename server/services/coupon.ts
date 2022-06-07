import mongoose from "mongoose";
import { CouponModel } from "@server/models";

class CouponService {
  public readonly coupon: CouponModel
  public readonly model: mongoose.Model<any>

  constructor() {
    this.coupon = new CouponModel();
    this.model = this.coupon.model;
  }
}

export default new CouponService()