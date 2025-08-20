// middleware banao for authenticated user
import { findById } from "../dao/user.data";
import { verifyToken } from "../utils/helper";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    const user = await findById(decoded);
    if (!user) {
      return res.status(404).json({ message: "Unauthorized" });
    }
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
