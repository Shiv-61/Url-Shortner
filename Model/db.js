const mongoose = require("mongoose");
require("dotenv").config();

function connect() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.log("DB Connection Error:", err));
}

module.exports = connect;
