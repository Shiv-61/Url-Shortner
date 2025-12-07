const mongoose = require("mongoose");
require("dotenv").config();
function connect() {
  mongoose
    .connect(process.url)
    .then()
    .catch(() => console.log("DB Connection Error"));
}
module.exports = connect();
