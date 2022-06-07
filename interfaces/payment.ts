import { EnumPayment } from "@/utils/enums"
import { CardType } from "@/interfaces"

export default interface PaymentType {
  _id?: string;
  type: EnumPayment;
  info: CardType;
  default: boolean;
  deleted: boolean;
}
