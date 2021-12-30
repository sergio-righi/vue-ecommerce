import { Card } from "@/models";
import { helpers } from "~/utils";
import { EnumPayment } from "@/utils/enums";

interface IPayment {
  _id?: string;
  type: EnumPayment;
  info: Card
  default: boolean;
  deleted: boolean;
}

class Payment implements IPayment {
  id?: string;
  type: EnumPayment;
  info: Card;
  default: boolean;
  deleted: boolean;

  constructor(o: IPayment = { _id: helpers.generateId(), type: EnumPayment.card, info: new Card(), default: false, deleted: false }) {
    this.id = o._id;
    this.type = o.type;
    this.info = o.info;
    this.default = o.default;
    this.deleted = o.deleted;
  }

  canCreate() {
    return true;
  }

  canUpdate() {
    return true;
  }
}

export default Payment;