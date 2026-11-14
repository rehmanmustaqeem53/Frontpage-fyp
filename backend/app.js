
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import { dbConnection } from "./config/db.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

// CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// MongoDB Connection
app.use("/api", async (req, res, next) => {
  try {
    await dbConnection();
    next();
  } catch (error) {
    console.error(
      "Database connection failed:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Frontpage Backend API is running",
  });
});

export default app;
