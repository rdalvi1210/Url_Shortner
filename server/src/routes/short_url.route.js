import express from "express";
import { createShortUrl, getShortUrl } from "../controller/short_url.controller.js";
import { get } from "mongoose";

const router = express.Router();

router.post("/api/create", createShortUrl);
router.get("/:shortUrl", getShortUrl);

export default router;
