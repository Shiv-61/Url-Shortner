require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connect = require("./Model/db");
const app = express();

connect();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "Views")));

const userRoutes = require("./Controller/UserRoutes");

const PORT = process.env.PORT || 3000;

app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
