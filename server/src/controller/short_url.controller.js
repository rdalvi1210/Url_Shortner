import { findUrlfromshortUrl } from "../dao/short_url.js";
import { createShortUrlWithoutUserService } from "../services/short_url.service.js";
import wrapAsync from "../utils/wrapasyncTrycatch.js";

export const createShortUrl = wrapAsync(async (req, res, next) => {
  const { url } = req.body;
  const shortUrl = await createShortUrlWithoutUserService(url);
  res.status(201).json({ shortUrl: process.env.APP_URL + shortUrl });
});

export const getShortUrl = wrapAsync(async (req, res) => {
  const { shortUrl } = req.params;
  const urlData = await findUrlfromshortUrl(shortUrl);
  res.redirect(urlData.full_url);
});
