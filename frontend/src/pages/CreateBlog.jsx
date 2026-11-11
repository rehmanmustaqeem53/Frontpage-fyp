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

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.post("/blogs/create", form);
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="max-w-2xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white p-6 shadow rounded"
    >
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        Create Blog
      </h1>

      <input
        type="text"
        placeholder="Title"
        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2 mb-3 rounded"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        type="text"
        placeholder="Image URL"
        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2 mb-3 rounded"
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      {/* Tiptap Editor */}
      <label className="font-semibold block mb-2 text-gray-800 dark:text-gray-300">
        Description
      </label>

      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-2">
        <TiptapEditor
          content=""
          onChange={(html) => setForm({ ...form, description: html })}
        />
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
      >
        Create
      </button>
    </form>
  );
}

