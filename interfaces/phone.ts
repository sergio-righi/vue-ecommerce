import { EnumCountry, EnumPhone } from "@/utils/enums";

export default interface PhoneType {
  type: EnumPhone;
  country: EnumCountry;
  number?: number;
}