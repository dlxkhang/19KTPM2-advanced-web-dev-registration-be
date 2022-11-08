const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    // assign createAt and updateAt fields to Schema
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
