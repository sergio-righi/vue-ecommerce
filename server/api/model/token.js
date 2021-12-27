const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true
    },
    number: {
      type: String
    },
    code: {
      type: String
    },
    done: {
      type: Date
    },
    expires: {
      type: Date,
      required: true
    }
  },
  { collection: "tokens", timestamps: true }
);

module.exports = mongoose.model("Token", schema);
