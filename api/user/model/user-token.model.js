const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserToken = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    token: { type: String, required: true },
  },
  {
    // assign createAt and updateAt fields to Schema
    timestamps: true,
  }
);

module.exports = mongoose.model("UserToken", UserToken);
