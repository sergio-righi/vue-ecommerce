
interface ICard {
    cardholder?: string;
    number?: string;
    expirationMonth?: number;
    expirationYear?: number;
    billingAddress?: string;
}

class Card implements ICard {
    cardholder?: string;
    number?: string;
    expirationMonth?: number;
    expirationYear?: number;
    billingAddress?: string;

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