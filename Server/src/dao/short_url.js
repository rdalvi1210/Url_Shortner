import urlSchema from "../models/short_url.model.js";
import { ConflictError } from "../utils/errorHandler.js";

/**
 * Save a new short URL to the database
 * @param {string} shortUrl - Generated or custom short code
 * @param {string} longUrl - Original full URL
 * @param {string} [userId] - Optional user ID if authenticated
 */
export const saveShortUrl = async (shortUrl, longUrl, userId = null) => {
  if (typeof longUrl !== "string") {
    throw new TypeError("longUrl must be a string");
  }

  if (typeof shortUrl !== "string") {
    throw new TypeError("shortUrl must be a string");
  }

  try {
    const newUrl = new urlSchema({
      full_url: longUrl,
      short_url: shortUrl,
      user: userId || undefined,
    });

    await newUrl.save();
    return newUrl;
  } catch (err) {
    // Handle duplicate short URL
    if (err.code === 11000) {
      throw new ConflictError("Short URL already exists");
    }
    throw err;
  }
};

/**
 * Find a short URL and increment its click count
 * @param {string} shortUrl - The short URL code
 * @returns {Promise<Object|null>} - The URL document
 */
export const getShortUrl = async (shortUrl) => {
  if (typeof shortUrl !== "string") {
    throw new TypeError("shortUrl must be a string");
  }
  return await urlSchema.findOneAndUpdate(
    { short_url: shortUrl },
    { $inc: { clicks: 1 } },
    { new: true }
  );
};

/**
 * Get a custom short URL by its slug
 * @param {string} slug - Custom slug
 * @returns {Promise<Object|null>} - The URL document
 */
export const getCustomShortUrl = async (slug) => {
  if (typeof slug !== "string") {
    throw new TypeError("slug must be a string");
  }
  return await urlSchema.findOne({ short_url: slug });
};
