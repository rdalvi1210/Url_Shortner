import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDb from "./src/config/mongoose.config.js";
import auth_routes from "./src/routes/auth.routes.js";
import short_url from "./src/routes/short_url.route.js";
import { attachUser } from "./src/utils/attachuser.js";
import { errorHandler } from "./src/utils/errorHandler.js";

dotenv.config({ path: "./.env" });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(attachUser);

// Routes
app.use("/api/auth", auth_routes);
app.use("/api/create", short_url);

// Example: single GET for redirect (if not in router)
app.get("/api/:shortUrl", short_url);

// Error handler (always last)
app.use(errorHandler);

app.listen(5000, () => {
  connectDb();
  console.log("Server is listening on http://localhost:5000");
});
