import axiosInstance from "../utils/axios.instance";

export const createUrl = async (url) => {
  const res = await axiosInstance.post("/api/create", {
    url,
  });
  return res.data.shortUrl;
};
