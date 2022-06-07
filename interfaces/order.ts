import { EnumStatus } from "@/utils/enums"
import { AddressType, ItemType, PaymentType } from "@/interfaces"

export default interface OrderType {
  _id?: string;
  userId?: string;
  couponId?: string;
  payment?: PaymentType;
  address?: AddressType;
  status: EnumStatus;
  discount: number;
  placementDate: number;
  paymentDate?: number;
  shippingDate?: number;
  cancelationDate?: number;
  completedDate?: number;
  books: Array<ItemType>;
}