import { helpers } from "@/utils";

interface IAddress {
    _id?: string;
    type: number;
    street?: string;
    zipcode?: string;
    country?: string;
    province?: string;
    city?: string;
    unit?: number;
    cost: number;
    deleted: boolean;
}

class Address implements IAddress {
    id?: string;
    type: number;
    street?: string;
    zipcode?: string;
    country?: string;
    province?: string;
    city?: string;
    unit?: number;
    cost: number;
    deleted: boolean;

    constructor(o: IAddress = { _id: helpers.generateId(), type: -1, cost: 0.00, deleted: false }) {
        this.id = o._id;
        this.type = o.type;
        this.street = o.street;
        this.zipcode = o.zipcode;
        this.country = o.country;
        this.province = o.province;
        this.city = o.city;
        this.unit = o.unit;
        this.cost = o.cost;
        this.deleted = o.deleted;
    }

    canCreate() {
        return true;
    }

    canUpdate() {
        return true;
    }
}

export default Address