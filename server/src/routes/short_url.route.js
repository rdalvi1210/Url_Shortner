import express from "express";
import {
  createShortUrl,
  getShortUrl,
} from "../controller/short_url.controller.js";

const router = express.Router();

router.post("/", createShortUrl);
router.get("/api/:shortUrl", getShortUrl);

export default router;
