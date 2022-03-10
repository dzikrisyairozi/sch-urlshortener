import express from 'express';
import home from "../controllers/home.js"

const router = express.Router();

router.route("/:shortUrl").get(home.getShortUrl);

export default router;