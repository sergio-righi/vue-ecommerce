import mongoose, { Schema } from 'mongoose'
import { BaseModel } from "./base.model";

const UserSchema: Schema = new Schema(
  {
    username: { type: String, trim: true, lowercase: true },
    password: { type: String },
    person: { type: Object },
    wishlist: { type: Array },
    validated: { type: Boolean, },
    roles: { type: Array },
    addresses: { type: Array },
    documents: { type: Array },
    payments: { type: Array },
    theme: { type: Boolean },
    locale: { type: String },
    deleted: { type: Boolean }
  },
  { collection: "eco_users", timestamps: true }
);

export class UserModel extends BaseModel {
  constructor() {
    super(
      mongoose.model('User', UserSchema)
    )
  }
}
