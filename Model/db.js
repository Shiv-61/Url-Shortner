const mongoose = require("mongoose");
require("dotenv").config();

function connect() {
  mongoose
    .connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
    })
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.log("DB Connection Error:", err));
}

module.exports = connect;
