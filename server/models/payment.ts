import mongoose, { Schema } from 'mongoose'
import { BaseModel } from "./base.model";

const PaymentSchema: Schema = new Schema(
  {
    type: { type: Number },
    info: { type: Object },
    default: { type: Boolean },
    deleted: { type: Boolean }
  },
  { collection: "eco_payments", timestamps: true }
);

export class PaymentModel extends BaseModel {
  constructor() {
    super(
      mongoose.model('Payment', PaymentSchema)
    )
  }
}
