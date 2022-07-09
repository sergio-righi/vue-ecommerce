import mongoose, { Schema } from "mongoose";
import { BaseModel } from "./base.model";

const UserSchema: Schema = new Schema(
  {
    userId: { type: String },
    person: { type: Object },
    wishlist: { type: Array },
    roles: { type: Array },
    addresses: { type: Array },
    documents: { type: Array },
    payments: { type: Array },
    theme: { type: Boolean },
    locale: { type: String }
  },
  { collection: "eco_users", timestamps: true }
);

class UserModel extends BaseModel {
  constructor() {
    super(mongoose.model("User", UserSchema));
  }
}

export default new UserModel();
