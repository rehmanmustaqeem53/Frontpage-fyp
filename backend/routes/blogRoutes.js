import express from "express";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog, 
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import {
  isAuthenticated,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", getAllBlogs);


router.get("/:id", getSingleBlog);

router.post("/create", isAuthenticated, authorizeRoles("Author"), createBlog);

router.put("/:id", isAuthenticated, authorizeRoles("Author"), updateBlog);

router.delete("/:id", isAuthenticated, authorizeRoles("Author"), deleteBlog);

export default router;
