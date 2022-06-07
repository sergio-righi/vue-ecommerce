import mongoose, { Schema } from 'mongoose'
import { BaseModel } from "./base.model";

const AuthorSchema: Schema = new Schema(
  {
    name: { type: String, required: true, },
    briefdescription: { type: String, },
    deleted: { type: Boolean }
  },
  { collection: "eco_authors", timestamps: true }
);

export class AuthorModel extends BaseModel {
  constructor() {
    super(
      mongoose.model('Author', AuthorSchema)
    )
  }
}