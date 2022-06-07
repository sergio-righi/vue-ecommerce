import { EnumBook } from "@/utils/enums";
import { BookType, DimensionType, ReviewType } from "@/interfaces";

export default class BookModel {

  constructor(params?: BookType) {
    Object.assign(this, { name: "", authors: [], type: EnumBook.physical, price: 0, discount: 0, inStock: 0, dimension: {} as DimensionType, reviews: [] as ReviewType[], genres: [], slug: "", deleted: false }, params);
  }

  static canCreate() {
    return true;
  }

  static canUpdate() {
    return true;
  }
}