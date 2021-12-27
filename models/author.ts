import { helpers } from "@/utils";

interface IAuthor {
    _id?: string;
    name?: string;
    briefdescription?: string;
    deleted: boolean;
}

class Author implements IAuthor {
    id?: string;
    name?: string;
    briefdescription?: string;
    deleted: boolean;

    constructor(o: IAuthor = { deleted: false }) {
        this.id = o._id ?? helpers.generateId();
        this.name = o.name;
        this.briefdescription = o.briefdescription;
        this.deleted = o.deleted;
    }

    canCreate() {
        return true;
    }

    canUpdate() {
        return true;
    }
}

export default Author