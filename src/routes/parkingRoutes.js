import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createParkingLot,
  getAllParkingLots,
  getParkingLotById,
  updateParkingLot,
  deleteParkingLot,
} from "../controllers/parkingController.js";
const router = express.Router();

router.post("/", authMiddleware, createParkingLot);
router.put("/:id", authMiddleware, updateParkingLot);
router.delete("/:id", authMiddleware, deleteParkingLot);
router.get("/", getAllParkingLots);
router.get("/:id", getParkingLotById);
export default router;