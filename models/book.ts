import { Dimension } from "@/models";
import { helpers } from "@/utils";
import { EnumBook } from "@/utils/enums";

interface IBook {
  _id?: string;
  name?: string;
  description?: string;
  age?: string;
  language?: string;
  authors: Array<string>;
  type: EnumBook;
  price: number;
  discount: number;
  inStock: number;
  publisher?: string;
  releaseDate?: number;
  isbn?: string;
  dimension: Dimension
  reviews: Array<string>;
  genres: Array<number>;
  deleted: boolean;
}

class Book implements IBook {
  id?: string;
  name?: string;
  description?: string;
  age?: string;
  language?: string;
  authors: string[];
  type: EnumBook;
  price: number;
  discount: number;
  inStock: number;
  publisher?: string;
  releaseDate?: number;
  isbn?: string;
  dimension: Dimension;
  reviews: string[];
  genres: number[];
  deleted: boolean;

  constructor(o: IBook = { _id: helpers.generateId(), authors: [], type: EnumBook.physical, price: 0, discount: 0, inStock: 0, dimension: new Dimension(), reviews: [], genres: [], deleted: false }) {
    this.id = o._id;
    this.name = o.name;
    this.description = o.description;
    this.age = o.age;
    this.language = o.language;
    this.authors = o.authors;
    this.type = o.type;
    this.price = o.price;
    this.discount = o.discount;
    this.inStock = o.inStock;
    this.publisher = o.publisher;
    this.releaseDate = o.releaseDate;
    this.isbn = o.isbn;
    this.dimension = o.dimension;
    this.reviews = o.reviews;
    this.genres = o.genres;
    this.deleted = o.deleted;
  }

  canCreate() {
    return true;
  }

  canUpdate() {
    return this.id;
  }

  get slug() {
    return this.name?.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
}

export default Book;
