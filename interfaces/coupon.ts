import { EnumDiscount } from "@/utils/enums"

export default interface CouponType {
  _id?: string;
  code?: string;
  startDate?: number;
  expireDate?: number;
  discount: number;
  unit: EnumDiscount;
}
