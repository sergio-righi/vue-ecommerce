import { Address, Item, Payment } from "@/models";
import { helpers } from "@/utils";
import { EnumStatus } from "@/utils/enums";

interface IOrder {
    _id?: string;
    userId?: string;
    couponId?: string;
    payment?: Payment;
    address?: Address;
    status: EnumStatus;
    discount: number;
    placementDate: number;
    paymentDate?: number;
    shippingDate?: number;
    cancelationDate?: number;
    completedDate?: number;
    books: Array<Item>;
}

class Order implements IOrder {
    id?: string;
    userId?: string;
    couponId?: string;
    payment?: Payment;
    address?: Address;
    status: EnumStatus;
    discount: number;
    placementDate: number;
    paymentDate?: number;
    shippingDate?: number;
    cancelationDate?: number;
    completedDate?: number;
    books: Item[];

    constructor(o: IOrder = { _id: helpers.generateId(), placementDate: Date.now(), status: EnumStatus.cancelled, discount: 0, books: [] }) {
        this.id = o._id;
        this.userId = o.userId;
        this.couponId = o.couponId;
        this.payment = o.payment;
        this.address = o.address;
        this.status = o.status;
        this.discount = o.discount;
        this.paymentDate = o.paymentDate;
        this.shippingDate = o.shippingDate;
        this.placementDate = o.placementDate;
        this.cancelationDate = o.cancelationDate;
        this.completedDate = o.completedDate;
        this.books = o.books;
    }

    canCreate() {
        return true;
    }

    canUpdate() {
        return true;
    }
}

export default Order