import express from "express";
import {
  createPayment,
  getAllPayments,
  getPaymentById,
} from "../controllers/paymentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPayment);

router.get("/", authMiddleware, getAllPayments);

router.get("/:id", authMiddleware, getPaymentById);

export default router;