import { helpers } from "@/utils";

interface IAddress {
    id?: string;
    type: number;
    street?: string;
    zipcode?: string;
    country?: string;
    province?: string;
    city?: string;
    unit?: number;
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
    deleted: boolean;

    constructor(o: IAddress = { type: -1, deleted: false }) {
        this.id = o.id ?? helpers.generateId();
        this.type = o.type;
        this.street = o.street;
        this.zipcode = o.zipcode;
        this.country = o.country;
        this.province = o.province;
        this.city = o.city;
        this.unit = o.unit;
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