import { findUrlfromshortUrl } from "../dao/short_url.js";
import { createShortUrlWithoutUserService } from "../services/short_url.service.js";

export const createShortUrl = async (req, res) => {
  const { url } = req.body;
  const shortUrl = await createShortUrlWithoutUserService(url);
  res.send(process.env.APP_URL + shortUrl);
};

export const getShortUrl = async (req, res) => {
  const { shortUrl } = req.params;
  const urlData = await findUrlfromshortUrl(shortUrl);
  res.redirect(urlData.full_url);
};
