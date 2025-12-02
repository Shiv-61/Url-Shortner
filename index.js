require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.get("/api/beyond", (req, res) => {
  return res.status(404).send("File not found");
});

app.listen(PORT, () => {
  console.log("Server started at port 3000");
});
