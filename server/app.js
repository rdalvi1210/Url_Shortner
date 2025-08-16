import dotenv from "dotenv";
import express from "express";
import connectDb from "./src/config/mongoose.config.js";
import short_url from "./src/routes/short_url.route.js";
dotenv.config("./.env");

const app = express();

app.use(express.json());

app.post("/api/create", short_url);

app.get("/:shortUrl", short_url);

app.listen(5000, () => {
  connectDb();
  console.log("Server is listening on http://localhost:5000");
});
