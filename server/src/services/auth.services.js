import { createUser, findByEmail } from "../dao/user.data.js";
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";

export const registerUserservice = async (name, email, password) => {
  const emailExists = await findByEmail(email);
  if (emailExists) {
    throw new ConflictError("Email already exists");
  }
  const user = await createUser(name, email, password);
  const token = await signToken({ id: user._id });
  return token;
};
