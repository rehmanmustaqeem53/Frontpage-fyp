import Blog from "../models/blogModel.js";
import Comment from "../models/commentModel.js";

// CREATE BLOG
export const createBlog = async (req, res) => {
  try {
    const { title, image, description } = req.body;

    const blog = await Blog.create({
      title,
      image,
      description,
      author: req.user._id
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL BLOGS (no search filter)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name")
      .sort({ createdAt: -1 }); // newest first

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE BLOG WITH COMMENTS
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const comments = await Comment.find({ blog: blog._id })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json({ blog, comments });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE BLOG
export const updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog.author.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not your blog" });

  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  res.json(updated);
};

// DELETE BLOG
export const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog.author.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not your blog" });

  await blog.deleteOne();
  res.json({ message: "Blog deleted" });
};