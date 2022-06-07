import { CardType, PaymentType } from "@/interfaces";
import { EnumPayment } from "@/utils/enums";

export default class PaymentModel {

  constructor(params?: PaymentType) {
    Object.assign(this, { type: EnumPayment.card, info: {} as CardType, default: false, deleted: false }, params);
  }

  static canCreate() {
    return true;
  }

  static canUpdate() {
    return true;
  }
}