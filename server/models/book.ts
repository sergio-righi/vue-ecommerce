import mongoose, { Schema } from 'mongoose'
import { BaseModel } from "./base.model"

const BookSchema: Schema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    rated: { type: Number },
    language: { type: String },
    authors: { type: Array },
    type: { type: Number },
    price: { type: Number },
    discount: { type: Number },
    inStock: { type: Number },
    publisher: { type: String },
    releaseDate: { type: Number },
    isbn: { type: String },
    dimension: { type: Object },
    reviews: { type: Array },
    genres: { type: Array },
    slug: { type: String },
    deleted: { type: Boolean, default: false }
  },
  { collection: "eco_books", timestamps: true }
);

class BookModel extends BaseModel {
  constructor() {
    super(
      mongoose.model('Book', BookSchema)
    )
  }
}

export default new BookModel();
