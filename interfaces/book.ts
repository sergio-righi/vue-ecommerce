import { EnumBook, EnumGenre, EnumRated } from "@/utils/enums"
import { DimensionType, ReviewType } from "@/interfaces";

export default interface BookType {
  _id?: string;
  name: string;
  description?: string;
  rated?: EnumRated;
  language?: string;
  authors: Array<string>;
  type: EnumBook;
  price: number;
  discount: number;
  inStock: number;
  publisher?: string;
  releaseDate?: number;
  isbn?: string;
  dimension: DimensionType
  reviews: Array<ReviewType>;
  genres: Array<EnumGenre>;
  slug: string;
  deleted: boolean;
}