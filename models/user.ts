import { Person } from "@/models";
import { helpers } from "@/utils";
import { EnumRole } from "@/utils/enums";

interface IUser {
    _id?: string;
    username?: string;
    password?: string;
    following: Array<string>;
    person: Person;
    payments: Array<string>;
    roles: Array<EnumRole>;
    createdAt: number;
    deleted: boolean;
}

class User implements IUser {
    id?: string;
    username?: string;
    password?: string;
    following: string[];
    person: Person;
    payments: string[];
    roles: EnumRole[];
    createdAt: number;
    deleted: boolean;

    constructor(o: IUser = { _id: helpers.generateId(), following: [], person: new Person(), payments: [], roles: [], createdAt: new Date().getTime(), deleted: false }) {
        this.id = o._id;
        this.username = o.username;
        this.password = o.password;
        this.following = o.following;
        this.person = o.person;
        this.payments = o.payments;
        this.roles = o.roles;
        this.createdAt = o.createdAt;
        this.deleted = o.deleted;
    }

    canCreate() {
        return true;
    }

    canUpdate() {
        return true;
    }
}

export default User