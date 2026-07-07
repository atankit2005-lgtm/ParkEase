import express from "express";
import {
  createBooking,
  getUserBookings,
  cancelBooking,
} from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBooking);

router.get("/user/:userId", authMiddleware, getUserBookings);

router.put("/:id/cancel", authMiddleware, cancelBooking);

export default router;