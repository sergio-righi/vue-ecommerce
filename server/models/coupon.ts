import mongoose, { Schema } from 'mongoose'
import { BaseModel } from "./base.model";

const CouponSchema: Schema = new Schema(
  {
    code: { type: String },
    startDate: { type: Number },
    expireDate: { type: Number },
    discount: { type: Number },
    unit: { type: Number },
    deleted: { type: Boolean }
  },
  { collection: "eco_coupons", timestamps: true }
);

export class CouponModel extends BaseModel {
  constructor() {
    super(
      mongoose.model('Coupon', CouponSchema)
    )
  }
}
