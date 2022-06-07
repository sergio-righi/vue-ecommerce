import { EnumGender } from "@/utils/enums"
import { PhoneType } from "@/interfaces";

export default interface PersonType {
  name?: string;
  email?: string;
  gender: EnumGender;
  birthday?: string;
  phone?: PhoneType;
}