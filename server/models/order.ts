import mongoose, { Schema } from 'mongoose'
import { BaseModel } from "./base.model";

const OrderSchema: Schema = new Schema(
  {
    userId: { type: String },
    couponId: { type: String },
    payment: { type: Object },
    address: { type: Object },
    status: { type: Number },
    discount: { type: Number },
    placementDate: { type: Number },
    paymentDate: { type: Number },
    shippingDate: { type: Number },
    cancelationDate: { type: Number },
    completedDate: { type: Number },
    books: { type: Array },
    deleted: { type: Boolean, default: false }
  },
  { collection: "eco_orders", timestamps: true }
);

export class OrderModel extends BaseModel {
  constructor() {
    super(
      mongoose.model('Order', OrderSchema)
    )
  }
}
