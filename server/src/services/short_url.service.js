import { saveShortUrl } from "../dao/short_url.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlWithoutUserService = async (url) => {
  const shortUrl = await generateNanoId(7);
  if (!shortUrl) throw new Error("Short URL not generated yet");
  await saveShortUrl(url, shortUrl);
  return shortUrl;
};

export const createShortUrlWithUserService = async (url, userId) => {
  const shortUrl = await generateNanoId(7);
  await saveShortUrl(url, shortUrl);
  return shortUrl;
};
