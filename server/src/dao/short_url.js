import UrlSchema from "../model/shorturl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (url, shortUrl, userId) => {
  try {
    const newShortUrl = new UrlSchema({
      full_url: url,
      short_url: shortUrl,
    });
    if (userId) {
      newShortUrl.user_id = userId;
    }
    await newShortUrl.save();

    return shortUrl;
  } catch (error) {
    if (error.code === 11000) {
      throw new ConflictError("Short URL already exists");
    }
    throw new Error("Short URL already exists");
  }
};

export const findUrlfromshortUrl = async (shortUrl) => {
  const urlData = await UrlSchema.findOneAndUpdate(
    { short_url: shortUrl },
    { $inc: { clicks: 1 } }
  );
  return urlData;
};
