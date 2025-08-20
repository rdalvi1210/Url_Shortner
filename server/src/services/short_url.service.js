import { checkShortUrlExists, saveShortUrl } from "../dao/short_url.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlWithoutUserService = async (url) => {
  const shortUrl = await generateNanoId(7);
  if (!shortUrl) throw new Error("Short URL not generated");
  await saveShortUrl(url, shortUrl);
  return shortUrl;
};

export const createShortUrlWithUserService = async (
  url,
  userId,
  slug = null
) => {
  const shortUrl = slug || generateNanoId(7);
  const exist = await checkShortUrlExists(slug);
  if (exist) throw new Error("Short URL already exists");
  await saveShortUrl(url, shortUrl, userId);
  return shortUrl;
};
