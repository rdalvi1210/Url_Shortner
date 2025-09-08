import { generateNanoId } from "../utils/helper.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";

/**
 * Create a short URL for anonymous users
 * @param {string} url - Original URL
 * @param {string|null} slug - Optional custom slug
 */
export const createShortUrlWithoutUser = async (url, slug = null) => {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL provided");
  }

  const shortUrl = slug ? String(slug) : generateNanoId(7);

  // Check if custom slug already exists
  if (slug) {
    const exists = await getCustomShortUrl(shortUrl);
    if (exists) throw new Error("This custom URL already exists");
  }

  await saveShortUrl(shortUrl, url); // no userId for anonymous
  return shortUrl;
};

/**
 * Create a short URL for authenticated users
 * @param {string} url - Original URL
 * @param {string} userId - User ID
 * @param {string|null} slug - Optional custom slug
 */
export const createShortUrlWithUser = async (url, userId, slug = null) => {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL provided");
  }

  const shortUrl = slug ? String(slug) : generateNanoId(7);

  // Check if custom slug already exists
  if (slug) {
    const exists = await getCustomShortUrl(shortUrl);
    if (exists) throw new Error("This custom URL already exists");
  }

  await saveShortUrl(shortUrl, url, userId);
  return shortUrl;
};
