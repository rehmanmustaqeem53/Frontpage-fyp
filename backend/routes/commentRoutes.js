import express from "express";
import { createComment } from "../controllers/commentController.js";
import {
  isAuthenticated,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/:blogId",
  isAuthenticated,
  authorizeRoles("Reader"),
  createComment,
);

export default router;
