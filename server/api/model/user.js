const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    name: {
      type: String
    },
    username: {
      trim: true,
      type: String,
      lowercase: true
    },
    password: {
      type: String
    },
    email: {
      trim: true,
      type: String,
      lowercase: true
    },
    roles: {
      type: Array
    },
    photo: {
      type: String
    },
    person: {
      type: Object
    },
    deleted: {
      type: Boolean,
      default: false
    },
    locked: {
      type: Boolean,
      default: true
    }
  },
  { collection: "users", timestamps: true }
);

module.exports = mongoose.model("User", schema);
