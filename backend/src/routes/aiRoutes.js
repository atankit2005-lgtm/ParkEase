import express from "express";
import { getParkingRecommendations } from "../controllers/aiController.js";

const router = express.Router();

router.post("/recommend", getParkingRecommendations);

export default router;
