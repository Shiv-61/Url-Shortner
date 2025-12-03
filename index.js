require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  return;
});

app.listen(PORT, () => {
  console.log("Server started at port 3000");
});
