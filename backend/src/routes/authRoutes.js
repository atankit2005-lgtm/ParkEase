import express from "express";
import { registerUser, loginUser, getMe, updateProfile } from "../controllers/authController.js";
import {
  registerValidation,
  loginValidation,
  validate,
} from "../validations/authValidation.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);
router.get("/me", authMiddleware, getMe);
router.put("/profile", authMiddleware, updateProfile);

export default router;