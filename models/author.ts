import { AuthorType } from "@/interfaces";

export default class AuthorModel {

    constructor(params?: AuthorType) {
        Object.assign(this, { deleted: false }, params);
    }

    static canCreate() {
        return true;
    }

    static canUpdate() {
        return true;
    }
}