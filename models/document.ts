import { helpers } from "@/utils";
import { EnumDocument } from "@/utils/enums";

interface IDocument {
    id?: string;
    number?: string;
    type: EnumDocument;
    deleted: boolean;
}

class Document implements IDocument {
    id?: string;
    number?: string;
    type: EnumDocument;
    deleted: boolean;

    constructor(o: IDocument = { type: EnumDocument.id, deleted: false }) {
        this.id = o.id ?? helpers.generateId();
        this.number = o.number;
        this.type = o.type;
        this.deleted = o.deleted;
    }
}

export default Document;