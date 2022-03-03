import express from "express";
import dashboardController from "../controllers/dashboard.js";

const app = express();
const router = express.Router();

router.route("/").get(dashboardController.getDashboard);

export default router;