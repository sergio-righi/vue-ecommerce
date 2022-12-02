import { EnumRole } from "@/utils/enums";
import { AddressType, CardType, DocumentType, PersonType } from "@/interfaces"

export default interface IUser {
  _id?: string;
  userId: string;
  wishlist: Array<string>;
  following: Array<string>;
  roles: Array<EnumRole>;
  theme: boolean;
  locale: string;
  person: PersonType;
  documents?: Array<DocumentType>;
  payments: Array<CardType>;
  addresses: Array<AddressType>;
}