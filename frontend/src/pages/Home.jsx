import { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
};

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data.slice(0, 6));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="mt-8">

      {/* HERO SECTION */}
      <section className="text-center py-16 bg-gray-400 dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-lg overflow-hidden transition-colors duration-500">
        {/* Animated Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0], // floating animation
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          Welcome to <span className="text-blue-400 dark:text-blue-900">Frontpage Blog</span>
        </motion.h1>

        {/* Animated Paragraph */}
        <motion.p
          className="text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          Explore high-quality articles written by authors around the world.
          Join as a reader or become an author and publish your own blogs!
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-6 space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link
            to="/blogs"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition-colors duration-300"
          >
            Explore Blogs
          </Link>

          <Link
            to="/register"
            className="bg-white dark:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            Create Account
          </Link>
        </motion.div>
      </section>

      {/* Latest Blogs */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Latest Blogs
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-1">
          Read the newest posts written by talented authors.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 hover:shadow-xl transition-colors duration-300"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}

              {/* TITLE + AUTHOR (same line) */}
              <div className="flex justify-between items-center mt-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{blog.title}</h3>

                {blog.author?.name && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-bold">
                    Author: <span className="font-bold">{blog.author.name}</span>
                  </p>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {stripHtml(blog.description).substring(0, 120)}...
              </p>

              <Link
                to={`/blogs/${blog._id}`}
                className="text-blue-600 dark:text-blue-400 mt-3 inline-block hover:underline"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>

        {blogs.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
            No blogs posted yet.
          </p>
        )}
      </section>
    </div>
  );
}