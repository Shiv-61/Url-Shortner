const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// TTL Index: automatically delete document 10 days (864000 seconds) after creation 
UrlSchema.index({ createdAt: 1 }, { expireAfterSeconds: 864000 });

const Url = mongoose.model("urls", UrlSchema);
module.exports = Url;
