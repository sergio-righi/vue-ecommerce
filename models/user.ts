import { PersonType, UserType } from "@/interfaces";

export default class UserModel {

    constructor(params?: UserType) {
        Object.assign(this, { following: [], wishlist: [], person: {} as PersonType, roles: [], validated: false, theme: false, locale: "en-CA", deleted: false }, params);
    }

    static canCreate() {
        return true;
    }

    static canUpdate() {
        return true;
    }
}