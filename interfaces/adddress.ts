import { EnumAddress, EnumCountry } from "@/utils/enums"

export default interface AddressType {
  type: EnumAddress;
  street?: string;
  zipcode?: string;
  country?: EnumCountry;
  province?: string;
  city?: string;
  unit?: number;
  cost: number;
  deleted: boolean;
}