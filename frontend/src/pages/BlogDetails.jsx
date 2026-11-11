import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function BlogDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blogs/${id}`);
      setBlog(res.data.blog);
      setComments(res.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    try {
      await api.post(`/comments/${id}`, { text: commentText });
      setCommentText("");
      fetchBlog();
    } catch (error) {
      alert("You are not allowed to comment");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  if (!blog) return <p className="text-gray-700 dark:text-gray-300">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-4 rounded-lg">

      {/* IMAGE */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-lg"
        />
      )}

      {/* TITLE */}
      <div className="flex justify-between items-center mt-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {blog.title}
        </h1>

        {blog.author?.name && (
          <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
            Author: <span className="font-bold">{blog.author.name}</span>
          </p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div
        className="prose dark:prose-invert max-w-none mt-6 text-gray-800 dark:text-gray-300 text-lg leading-relaxed
        [&_ul]:list-disc [&_ul]:ml-6
        [&_ol]:list-decimal [&_ol]:ml-6
        [&_li]:ml-2"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      ></div>

      {/* COMMENT SECTION */}
      <h2 className="text-2xl mt-10 font-semibold text-gray-900 dark:text-white">
        Comments
      </h2>

      {/* COMMENT BOX */}
      {user && (
        <div className="mt-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2 rounded"
            placeholder="Write your comment..."
          />
          <button
            onClick={addComment}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-2 rounded"
          >
            Add Comment
          </button>
        </div>
      )}

      {/* SHOW COMMENTS */}
      <div className="mt-6 space-y-4">
        {comments.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
        )}

        {comments.map((c) => (
          <div
            key={c._id}
            className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
          >
            <p className="font-semibold text-gray-900 dark:text-white">
              {c.user?.name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">{c.text}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
