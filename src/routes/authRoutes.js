import express from "express";
// import { registerUser } from "../controllers/authController.js";
import { registerUser, loginUser } from "../controllers/authController.js";
import {
  registerValidation,
  loginValidation,
  validate,
} from "../validations/authValidation.js";

const router = express.Router();

// Register User
router.post(
  "/register",
  registerValidation,
  validate,
  registerUser
);

router.post(
  "/login",
  loginValidation,
  validate,
  loginUser
);
export default router;