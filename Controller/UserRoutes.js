const express = require("express");
const gen_url = require("./GenerateURL");
const router = express.Router();

router.post("/generate-url", (req, res) => {
  const get_new_url = gen_url(req.body.url);
  res.status(200).json({
    originalUrl: longUrl,
    shortUrl: `https://shortly.io/${get_new_url}`,
    shortCode: shortCode,
  });
});

module.exports = router;
