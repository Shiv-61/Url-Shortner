require("dotenv").config();

const express = require("express");
const app = express();

const userRoutes = require("./Controller/UserRoutes");

const PORT = process.env.PORT || 3000;

app.use("/short-url", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
