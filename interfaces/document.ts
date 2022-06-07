import { EnumDocument } from "@/utils/enums"

export default interface DocumentType {
  number?: string;
  type: EnumDocument;
  deleted: boolean;
}
