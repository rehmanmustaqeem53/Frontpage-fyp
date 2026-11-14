
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Login required. Please log in again.",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET is not configured",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found. Please log in again.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

// Check User Role
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You are not authorized.",
      });
    }

    next();
  };
};
