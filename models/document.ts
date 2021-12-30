import { helpers } from "@/utils";
import { EnumDocument } from "@/utils/enums";

interface IDocument {
    _id?: string;
    number?: string;
    type: EnumDocument;
    deleted: boolean;
}

class Document implements IDocument {
    id?: string;
    number?: string;
    type: EnumDocument;
    deleted: boolean;

    constructor(o: IDocument = { _id: helpers.generateId(), type: EnumDocument.id, deleted: false }) {
        this.id = o._id;
        this.number = o.number;
        this.type = o.type;
        this.deleted = o.deleted;
    }
}

export default Document;