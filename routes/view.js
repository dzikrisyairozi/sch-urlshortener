import express from "express";
import viewController from "../controllers/view.js";

const app = express();
const router = express.Router();

router.get("/", viewController.getHome);
router.get("/dashboard", viewController.getDashboard);
router.get("/login", viewController.login_get);
router.get("/signup", viewController.signup_get);
export default router;