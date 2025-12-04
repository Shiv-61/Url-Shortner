const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: String,
    old_url: String,
    new_url: String,
  },
  { timestamps: true }
);
const users = mongoose.model("users", User);
module.exports = users;
