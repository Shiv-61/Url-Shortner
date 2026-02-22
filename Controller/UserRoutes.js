const express = require("express");
const gen_url = require("./GenerateURL");
const Url = require("../Model/User");
const { Redis } = require("@upstash/redis");
const router = express.Router();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Health check / Wake-up endpoint
router.get("/health", (req, res) => {
  res.status(200).json({ status: "Active", message: "Server is awake" });
});

router.post("/url", async (req, res) => {
  try {
    const longUrl = req.body.url;
    const shortCode = gen_url();
    const shortUrl = `https://url-shortner-mauve-nine.vercel.app/${shortCode}`;

    // make a new entry in DB
    const newUrl = await Url.create({
      originalUrl: longUrl,
      shortCode: shortCode,
      shortUrl: shortUrl,
    });

    // Cache the newly created URL with a 5 day expiration (432000 seconds)
    await redis.set(shortCode, longUrl, { ex: 432000 });

    // success and sending new short url.
    res.status(200).json({
      originalUrl: newUrl.originalUrl,
      shortUrl: newUrl.shortUrl,
      shortCode: newUrl.shortCode,
    });
  } catch (err) {
    console.error("Error creating short URL:", err.message);
    console.error("Full error:", err);
    res
      .status(500)
      .json({ error: "Failed to create short URL", details: err.message });
  }
});

router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    // Check Redis Cache
    const cachedUrl = await redis.get(shortCode);

    if (cachedUrl) {
      return res.redirect(cachedUrl);
    }

    // Find URL
    const urlData = await Url.findOne({ shortCode: shortCode });

    if (urlData) {
      // Set to cache with a 5 day expiration (432000 seconds)
      await redis.set(shortCode, urlData.originalUrl, { ex: 432000 });
      res.redirect(urlData.originalUrl);
    } else {
      res.status(404).json({ error: "404 URL not found :(" });
    }
  } catch (err) {
    console.error("Error finding short URL:", err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

module.exports = router;
