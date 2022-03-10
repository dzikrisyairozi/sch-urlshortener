import express from 'express';
import home from "../controllers/home.js"
import dashboardController from "../controllers/dashboard.js";

const router = express.Router();

router.route("/").get(home.getHome);
router.route("/dashboard").get(dashboardController.homeGetDashboard);
router.route("/:shortUrl").get(home.getShortUrl);

export default router;