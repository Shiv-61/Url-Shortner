const express = require("express");
const gen_url = require("./GenerateURL");
const Url = require("../Model/User");
const router = express.Router();


// Health check / Wake-up endpoint
router.get("/health", (req, res) => {
  res.status(200).json({ status: "Active", message: "Server is awake" });
});

router.post("/url", async (req, res) => {
  console.log("[DEBUG] POST /url - Request received");
  console.log("[DEBUG] Request body:", req.body);
  console.log("[DEBUG] DB connection state:", require('mongoose').connection.readyState);
  
  try {
    const longUrl = req.body.url;
    console.log("[DEBUG] Long URL:", longUrl);
    
    const shortCode = gen_url();
    console.log("[DEBUG] Generated shortCode:", shortCode);
    
    const shortUrl = `https://url-shortner-mauve-nine.vercel.app/${shortCode}`;
    console.log("[DEBUG] Generated shortUrl:", shortUrl);

    // make a new entry in DB
    console.log("[DEBUG] Attempting to create DB entry...");
    const newUrl = await Url.create({
      originalUrl: longUrl,
      shortCode: shortCode,
      shortUrl: shortUrl,
    });
    console.log("[DEBUG] DB entry created successfully:", newUrl);
    
    // success and sending new short url.
    res.status(200).json({
      originalUrl: newUrl.originalUrl,
      shortUrl: newUrl.shortUrl,
      shortCode: newUrl.shortCode,
    });
    console.log("[DEBUG] Response sent successfully");
  } catch (err) {
    console.error("[DEBUG] Error in POST /url:");
    console.error("[DEBUG] Error message:", err.message);
    console.error("[DEBUG] Error name:", err.name);
    console.error("[DEBUG] Error stack:", err.stack);
    console.error("[DEBUG] Full error:", err);
    res
      .status(500)
      .json({ error: "Failed to create short URL", details: err.message });
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
      res.status(404).json({ error: "404 URL not found :(" });
    }
  } catch (err) {
    console.error("Error finding short URL:", err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

module.exports = router;
