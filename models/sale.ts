import { Item } from "@/models";
import { helpers } from "@/utils";
import { EnumStatus } from "@/utils/enums";

interface ISale {
    _id?: string;
    userId?: string;
    couponId?: string;
    paymentId?: string;
    addressId?: string;
    status: EnumStatus;
    discount: number;
    paymentDate?: number;
    shippingDate?: number;
    cancelationDate?: number;
    completedDate?: number;
    books: Array<Item>;
}

class Sale implements ISale {
    id?: string;
    userId?: string;
    couponId?: string;
    paymentId?: string;
    addressId?: string;
    status: EnumStatus;
    discount: number;
    paymentDate?: number;
    shippingDate?: number;
    cancelationDate?: number;
    completedDate?: number;
    books: Item[];

    constructor(o: ISale = { status: EnumStatus.pending, discount: 0, books: [] }) {
        this.id = o._id ?? helpers.generateId();
        this.userId = o.userId;
        this.couponId = o.couponId;
        this.paymentId = o.paymentId;
        this.addressId = o.addressId;
        this.status = o.status;
        this.discount = o.discount;
        this.paymentDate = o.paymentDate;
        this.shippingDate = o.shippingDate;
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

export default Sale