import mongoose from "mongoose";
import { PaymentModel } from "@server/models";

class PaymentService {
  public readonly payment: PaymentModel
  public readonly model: mongoose.Model<any>

  constructor() {
    this.payment = new PaymentModel();
    this.model = this.payment.model;
  }
}

export default new PaymentService()