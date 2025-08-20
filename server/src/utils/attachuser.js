import { findById } from "../dao/user.data.js";
import { verifyToken } from "./helper.js";

export const attachUser = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next();

  try {
    const decoded = verifyToken(token);
    const user = await findById(decoded);
    if (!user) return next();
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};
