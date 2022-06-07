import { AddressType } from "@/interfaces"

export default interface CardType {
  cardholder?: string;
  number?: string;
  expirationYear?: number;
  expirationMonth?: number;
  billingAddress?: AddressType;
}