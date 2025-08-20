import { registerUserservice } from "../services/auth.services.js";
import wrapAsync from "../utils/wrapasyncTrycatch.js";

export const registerUser = wrapAsync(async (req, res, next) => {
  console.log("Hello i am register");
  const { name, email, password } = req.body;
  const token = await registerUserservice(name, email, password);
  return res.status(201).json({ token });
});

// export const loginUser = wrapAsync(async (req, res) => {
//   // Handle user login
// });
