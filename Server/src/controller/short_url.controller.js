import { getShortUrl } from "../dao/short_url.js";
import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from "../services/short_url.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

/**
 * Create a short URL
 * If the user is authenticated, associate it with the user
 * Otherwise, create an anonymous short URL
 */
export const createShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;
  let shortUrl;

  if (req.user) {
    // Authenticated user: create URL with user
    shortUrl = await createShortUrlWithUser(url, req.user._id, slug);
  } else {
    // Anonymous URL
    shortUrl = await createShortUrlWithoutUser(url, slug);
  }

  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});

/**
 * Redirect from a short URL
 */
export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);

  if (!url) throw new Error("Short URL not found");

  res.redirect(url.full_url);
});

/**
 * Create a custom short URL (slug provided)
 * Can be used for both anonymous and authenticated users
 */
export const createCustomShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;

  if (!slug) throw new Error("Custom slug is required");

  // Create a short URL without a user (or you could extend this to support user)
  const shortUrl = await createShortUrlWithoutUser(url, slug);

  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});
