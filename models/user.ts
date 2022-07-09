import { UserType } from "@/interfaces";

export default class UserModel {

    constructor(params?: UserType) {
        Object.assign(this, { following: [], wishlist: [], roles: [], theme: false, locale: "en-CA" }, params);
    }

    static canCreate() {
        return true;
    }

    static canUpdate() {
        return true;
    }
}