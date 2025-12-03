require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.get("/api", (req, res) => {
  return res.status(404).send("Shiv You are programming the world");
});

app.listen(PORT, () => {
  console.log("Server started at port 3000");
});
