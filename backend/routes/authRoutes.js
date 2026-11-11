import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

// Logout User
router.get("/logout", logout);

// Get Logged-in User (for frontend AuthContext.jsx)
router.get("/me", isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

export default router;
