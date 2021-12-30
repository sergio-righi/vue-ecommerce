import { Address } from "@/models";

interface ICard {
    cardholder?: string;
    number?: string;
    expirationYear?: number;
    expirationMonth?: number;
    billingAddress?: Address;
}

class Card implements ICard {
    cardholder?: string;
    number?: string;
    expirationYear?: number;
    expirationMonth?: number;
    billingAddress?: Address;

    constructor(o: ICard = {}) {
        this.cardholder = o.cardholder;
        this.number = o.number;
        this.expirationMonth = o.expirationMonth;
        this.expirationYear = o.expirationYear;
        this.billingAddress = o.billingAddress;
    }

    canCreate() {
        return true;
    }

    canUpdate() {
        return true;
    }
}

export default Card;