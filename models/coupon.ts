import { CouponType } from "@/interfaces";
import { EnumDiscount } from "@/utils/enums";

export default class CouponModel {

    constructor(params?: CouponType) {
        Object.assign(this, { discount: 0, unit: EnumDiscount.fixed }, params);
    }

    static canCreate() {
        return true;
    }

    static canUpdate() {
        return true;
    }
}