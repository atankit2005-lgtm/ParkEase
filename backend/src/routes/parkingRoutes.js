import express from "express";
import authMiddleware, { adminOnly } from "../middleware/authMiddleware.js";
// import authMiddleware from "../middleware/authMiddleware.js";
import {
  createParkingLot,
  getAllParkingLots,
  getParkingLotById,
  updateParkingLot,
  deleteParkingLot,
} from "../controllers/parkingController.js";
const router = express.Router();

// router.post("/", authMiddleware, createParkingLot);
// router.put("/:id", authMiddleware, updateParkingLot);
// router.delete("/:id", authMiddleware, deleteParkingLot);
router.post("/", authMiddleware, adminOnly, createParkingLot);

router.put("/:id", authMiddleware, adminOnly, updateParkingLot);

router.delete("/:id", authMiddleware, adminOnly, deleteParkingLot);
router.get("/", getAllParkingLots);
router.get("/:id", getParkingLotById);
export default router;