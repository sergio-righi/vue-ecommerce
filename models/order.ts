import { OrderType } from "@/interfaces";
import { EnumStatus } from "@/utils/enums";

export default class OrderModel {

    constructor(params?: OrderType) {
        Object.assign(this, { placementDate: Date.now(), status: EnumStatus.cancelled, discount: 0, books: [] }, params);
    }

    static canCreate() {
        return true;
    }

    static canUpdate() {
        return true;
    }
}