import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    if (!user) return;

    try {
      const res = await api.get("/blogs");
      const authorBlogs = res.data.filter(
        (b) => b.author && b.author._id === user._id,
      );
      setBlogs(authorBlogs);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await api.delete(`/blogs/${id}`);
      fetchBlogs(); // refresh
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [user]);

  if (!user || user.role !== "Author")
    return <h1 className="text-red-600">Access Denied</h1>;

  return (
    <div>
      <h1 className="text-3xl font-bold">Your Blogs</h1>

      {/* CREATE BLOG BUTTON */}
      <Link
        to="/dashboard/create"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg inline-block mt-4 shadow-md transition"
      >
        Create Blog
      </Link>
      <p className="text-white-600 mt-3 text-3xl font-bold">Manage Blog</p>

      {/* BLOGS CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          blogs.map((b) => (
            <div
              key={b._id}
              className="bg-grey-400 dark:bg-gray-800 shadow-lg rounded-lg p-4 hover:shadow-xl transition-colors "
            >
              {/* IMAGE */}
              {b.image && (
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-48 object-cover"
                />
              )}

               <div className="p-4">
              {/* TITLE + AUTHOR ON SAME LINE */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-xl text-gray-900 dark:text-white">{b.title}</h2>

                {b.author?.name && (
                  <p className="text-sm text-gray-900 dark:text-white font-bold">
                    Author: <span className="font-bold">{b.author.name}</span>
                  </p>
                )}
              </div>

             {/* DESCRIPTION SNIPPET (cleaned) */}
                <p className="text-gray-600">
                  {b.description.replace(/<[^>]+>/g, "").substring(0, 100)}...
                </p>

                {/* EDIT + DELETE BUTTONS */}
                <div className="mt-4 flex justify-between items-center gap-2">
                  <Link
                    to={`/dashboard/edit/${b._id}`}
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
                  >
                    ✏️ Edit
                  </Link>

                  <button
                    onClick={() => deleteBlog(b._id)}
                    className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
