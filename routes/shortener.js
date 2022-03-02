import express from 'express';
import  shortener from "../controllers/shortener.js"

const router = express.Router();

router.route("/").post(shortener.postShortener);

export default router;