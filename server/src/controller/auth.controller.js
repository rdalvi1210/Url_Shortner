import { cookieOptions } from "../config/config.js";
import {
  loginUserService,
  registerUserservice,
} from "../services/auth.services.js";
import wrapAsync from "../utils/wrapasyncTrycatch.js";

export const registerUser = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const token = await registerUserservice(name, email, password);
  res.cookie("accessToken", token, cookieOptions);
  return res.status(200).json({ message: "User registered successfully" });
});

export const loginUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUserService(email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  return res.status(200).json({ message: "User logged in successfully" });
});
