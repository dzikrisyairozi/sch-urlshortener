import express from "express";

const router = express.router;

router.route("/").get(res.send("Dashboard"));

export default router;