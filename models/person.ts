import { Address, Document, Payment } from "@/models";
import { EnumGender } from "@/utils/enums";

interface IPerson {
    name?: string;
    email?: string;
    phone?: string;
    gender: EnumGender;
    birthday?: string;
    documents?: Array<Document>;
    payments?: Array<Payment>;
    addresses?: Array<Address>;
}

class Person implements IPerson {
    name?: string;
    email?: string;
    phone?: string;
    gender: EnumGender;
    birthday?: string;
    payments?: Payment[]
    addresses?: Address[];
    documents?: Document[];

    constructor(o: IPerson = { gender: EnumGender.omit }) {
        this.name = o.name;
        this.email = o.email;
        this.phone = o.phone;
        this.gender = o.gender;
        this.birthday = o.birthday;
        this.payments = o.payments;
        this.addresses = o.addresses;
    }
}

export default Person;