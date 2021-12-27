import { helpers } from "@/utils";
import { EnumDiscount } from "@/utils/enums";

interface ICoupon {
    _id?: string;
    code?: string;
    startDate?: number;
    expireDate?: number;
    discount: number;
    unit: EnumDiscount;
}

class Coupon implements ICoupon {
    id?: string;
    code?: string;
    startDate?: number;
    expireDate?: number;
    discount: number;
    unit: EnumDiscount;

    constructor(o: ICoupon = { discount: 0, unit: EnumDiscount.fixed }) {
        this.id = o._id ?? helpers.generateId();
        this.code = o.code;
        this.startDate = o.startDate;
        this.expireDate = o.expireDate;
        this.discount = o.discount;
        this.unit = o.unit;
    }

    canCreate() {
        return true;
    }

    canUpdate() {
        return true;
    }
}

export default Coupon