import UrlSchema from "../model/shorturl.model.js";

export const saveShortUrl = async (url, shortUrl, userId) => {
  const newShortUrl = new UrlSchema({
    full_url: url,
    short_url: shortUrl,
  });
  if (userId) {
    newShortUrl.user_id = userId;
  }
  newShortUrl.save();

  return shortUrl;
};

export const findUrlfromshortUrl = async (shortUrl) => {
  const urlData = await UrlSchema.findOneAndUpdate(
    { short_url: shortUrl },
    { $inc: { clicks: 1 } }
  );
  return urlData;
};
