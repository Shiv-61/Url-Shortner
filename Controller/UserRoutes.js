const express = require("express");

const router = express.Router();

router.get("/generate-url", (req, res) => {
  res.send("Hello this is the generated URL");
});

module.exports = router;
