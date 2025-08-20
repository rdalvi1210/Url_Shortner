import { createUser, findByEmail } from "../dao/user.data.js";
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";

export const registerUserservice = async (name, email, password) => {
  const emailExists = await findByEmail(email);
  if (emailExists) {
    throw new ConflictError("Email already exists");
  }
  const user = await createUser(name, email, password);
  const token = signToken({ id: user._id });
  return token;
};

export const loginUserService = async (email, password) => {
  const user = await findByEmail(email);
  if (!user || user.password !== password) {
    throw new Error("Invalid email or password");
  }
  const token = await signToken({ id: user._id });
  return { token, user };
};
