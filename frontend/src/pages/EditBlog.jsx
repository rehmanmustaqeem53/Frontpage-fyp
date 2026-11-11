import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import TiptapEditor from "../components/TiptapEditor";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blogs/${id}`);
      const { blog } = res.data;

      setForm({
        title: blog.title,
        image: blog.image,
        description: blog.description, // HTML content from DB
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.put(`/blogs/${id}`, form);
    navigate("/dashboard");
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <form
      onSubmit={submitHandler}
      className="max-w-2xl mx-auto 
bg-white dark:bg-gray-800 
p-6 shadow rounded 
border border-gray-200 dark:border-gray-700
transition-colors duration-300"
    >
      <h1 className="text-3xl mb-4 font-bold text-gray-800 dark:text-white">
        Edit Blog
      </h1>

      {/* TITLE */}
      <input
        type="text"
        className="w-full border border-gray-300 dark:border-gray-600 
  p-2 mb-3 rounded 
  bg-white dark:bg-gray-700 
  text-gray-900 dark:text-white 
  placeholder-gray-500 dark:placeholder-gray-400
  focus:outline-none focus:ring-2 focus:ring-blue-500 "
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      {/* IMAGE */}
      <input
        type="text"
        className="w-full border border-gray-300 dark:border-gray-600 
  p-2 mb-3 rounded 
  bg-white dark:bg-gray-700 
  text-gray-900 dark:text-white 
  placeholder-gray-500 dark:placeholder-gray-400
  focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Image URL"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      {/* DESCRIPTION WITH TIPTAP */}
      <label className="font-semibold mb-2 block text-gray-700 dark:text-white">
        Description
      </label>
      <TiptapEditor
        key={id + form.description} // ⭐ FIX: Forces Tiptap to reload content
        content={form.description}
        onChange={(html) => setForm({ ...form, description: html })}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
        Update Blog
      </button>
    </form>
  );
}
