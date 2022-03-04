import express from "express";
import dashboardController from "../controllers/dashboard.js";

const app = express();
const router = express.Router();

router.route("/")
.get(dashboardController.getDashboard)
.delete(dashboardController.deleteUrl)
.put(dashboardController.updateUrl)

export default router;