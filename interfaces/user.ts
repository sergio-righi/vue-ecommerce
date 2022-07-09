import { EnumRole } from "@/utils/enums";
import { AddressType, CardType, DocumentType } from "@/interfaces"

export default interface IUser {
  _id?: string;
  userId: string;
  wishlist: Array<string>;
  following: Array<string>;
  roles: Array<EnumRole>;
  theme: boolean;
  locale: string;
  documents?: Array<DocumentType>;
  payments: Array<CardType>;
  addresses: Array<AddressType>;
}