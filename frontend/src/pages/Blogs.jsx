
import { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from backend
  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await api.get("/blogs");
      const data = res.data;

      // Handle different API response formats
      const blogsData = Array.isArray(data)
        ? data
        : Array.isArray(data?.blogs)
        ? data.blogs
        : Array.isArray(data?.posts)
        ? data.posts
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setBlogs(blogsData);

      console.log("Blogs fetched:", blogsData);

    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // Strip HTML for preview
  const stripHtml = (html) => {
    if (!html) return "";

    const div = document.createElement("div");
    div.innerHTML = html;

    return div.textContent || div.innerText || "";
  };

  // Initial fetch
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="mt-6 px-4">

      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        All Blogs
      </h1>

      {/* Loading Indicator */}
      {loading && (
        <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
          Loading blogs...
        </p>
      )}

      {/* Blog Cards */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {blogs.length > 0 ? (
            blogs.map((b) => (
              <div
                key={b._id}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-colors duration-300"
              >

                {b.image && (
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-4">

                  {/* Title + Author */}
                  <div className="flex justify-between items-center gap-2 mb-2">

                    <h2 className="font-bold text-xl text-gray-900 dark:text-white">
                      {b.title}
                    </h2>

                    {b.author?.name && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-bold shrink-0">
                        Author: {b.author.name}
                      </p>
                    )}

                  </div>

                  {/* Description Preview */}
                  <p className="text-gray-600 dark:text-gray-300">
                    {stripHtml(b.description).substring(0, 120)}...
                  </p>

                  {/* Read More */}
                  <Link
                    to={`/blogs/${b._id}`}
                    className="text-blue-600 dark:text-blue-400 mt-3 inline-block font-medium hover:underline"
                  >
                    Read More →
                  </Link>

                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 col-span-3 mt-10">
              No blogs found.
            </p>
          )}

        </div>
      )}

    </div>
  );
}
