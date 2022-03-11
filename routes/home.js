import express from 'express';
import home from "../controllers/home.js"
import dashboardController from "../controllers/dashboard.js";
import authController from '../controllers/auth.js'

const router = express.Router();

router.route("/").get(home.getHome);
router.route("/dashboard").get(dashboardController.homeGetDashboard);
router.route("/auth/login").get(authController.login_get);
router.route("/auth/signup").get(authController.signup_get);
router.route("/:shortUrl").get(home.getShortUrl);

export default router;