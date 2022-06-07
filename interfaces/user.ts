import { EnumRole } from "@/utils/enums";
import { AddressType, CardType, DocumentType, PersonType } from "@/interfaces"

export default interface IUser {
  _id?: string;
  username?: string;
  password?: string;
  wishlist: Array<string>;
  following: Array<string>;
  person: PersonType;
  validated: boolean;
  roles: Array<EnumRole>;
  theme: boolean;
  locale: string;
  documents?: Array<DocumentType>;
  payments: Array<CardType>;
  addresses: Array<AddressType>;
  deleted: boolean;
}