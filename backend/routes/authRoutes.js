
import express from "express";

import {
  register,
  login,
  logout,
} from "../controllers/authController.js";

import {
  isAuthenticated,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Logout
router.get("/logout", logout);

// Get Logged-in User
router.get("/me", isAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;
