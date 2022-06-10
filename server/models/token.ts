import mongoose, { Schema } from 'mongoose'
import { BaseModel } from "./base.model";

const TokenSchema: Schema = new Schema(
  {
    user: { type: String, required: true },
    number: { type: String },
    code: { type: String },
    done: { type: Date },
    expires: { type: Date, required: true }
  },
  { collection: "eco_tokens", timestamps: true }
);

class TokenModel extends BaseModel {
  constructor() {
    super(
      mongoose.model('Token', TokenSchema)
    )
  }
}

export default new TokenModel();