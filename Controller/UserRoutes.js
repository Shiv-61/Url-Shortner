const express = require("express");
const gen_url = require("./GenerateURL");
const Url = require("../Model/User");
const router = express.Router();

router.post("/url", async (req, res) => {
  try {
    const longUrl = req.body.url;
    const shortCode = gen_url();
    const shortUrl = `https://url-shortner-voyager.vercel.app/${shortCode}`;

    const newUrl = await Url.create({
      originalUrl: longUrl,
      shortCode: shortCode,
      shortUrl: shortUrl,
    });

    res.status(200).json({
      originalUrl: newUrl.originalUrl,
      shortUrl: newUrl.shortUrl,
      shortCode: newUrl.shortCode,
    });
  } catch (err) {
    console.error("Error creating short URL:", err);
    res.status(500).json({ error: "Failed to create short URL" });
  }
});

router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    // Find URL
    const urlData = await Url.findOne({ shortCode: shortCode });

    if (urlData) {
      res.redirect(urlData.originalUrl);
    } else {
      res.status(404).json({ error: "Short URL not found" });
    }
  } catch (err) {
    console.error("Error finding short URL:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
