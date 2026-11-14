
import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import TiptapEditor from "../components/TiptapEditor";

export default function CreateBlog() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.title.trim() ||
      !form.image.trim() ||
      !form.description.replace(/<[^>]*>/g, "").trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/blogs/create", form);

      navigate("/dashboard");
    } catch (err) {
      console.error(
        "Create Blog Error:",
        err.response?.data || err
      );

      if (err.response?.status === 401) {
        setError(
          "Your session has expired. Please log in again."
        );
      } else if (err.response?.status === 403) {
        setError(
          "Only Authors can create blogs."
        );
      } else {
        setError(
          err.response?.data?.message ||
          "Failed to create blog. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="max-w-2xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white p-6 shadow rounded"
    >
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Create Blog
      </h1>

      {error && (
        <p className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </p>
      )}

      <input
        type="text"
        placeholder="Title"
        value={form.title}
        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2 mb-3 rounded"
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />

      <input
        type="text"
        placeholder="Image URL"
        value={form.image}
        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2 mb-3 rounded"
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            image: e.target.value,
          }))
        }
      />

      <label className="font-semibold block mb-2 text-gray-800 dark:text-gray-300">
        Description
      </label>

      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2">
        <TiptapEditor
          content=""
          onChange={(html) =>
            setForm((prev) => ({
              ...prev,
              description: html,
            }))
          }
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded mt-4"
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
