const mongoose = require("mongoose");
require("dotenv").config();
function connect() {
  mongoose
    .connect(process.url)
    .then(() => console.log("DB Connected"))
    .catch(() => console.log("DB Connection Error"));
}
module.exports = connect();
