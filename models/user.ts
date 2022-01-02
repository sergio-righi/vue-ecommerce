import { Person } from "@/models";
import { helpers } from "@/utils";
import { EnumRole } from "@/utils/enums";

interface IUser {
    _id?: string;
    username?: string;
    password?: string;
    wishlist: Array<string>;
    following: Array<string>;
    person: Person;
    roles: Array<EnumRole>;
    theme: boolean;
    locale: string;
    createdAt: number;
    deleted: boolean;
}

class User implements IUser {
    id?: string;
    username?: string;
    password?: string;
    wishlist: string[];
    following: string[];
    person: Person;
    roles: EnumRole[];
    theme: boolean;
    locale: string;
    createdAt: number;
    deleted: boolean;

    constructor(o: IUser = { _id: helpers.generateId(), following: [], wishlist: [], person: new Person(), roles: [], theme: false, locale: "en-CA", createdAt: new Date().getTime(), deleted: false }) {
        this.id = o._id;
        this.username = o.username;
        this.password = o.password;
        this.following = o.following;
        this.wishlist = o.wishlist;
        this.person = o.person;
        this.roles = o.roles;
        this.theme = o.theme;
        this.locale = o.locale;
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