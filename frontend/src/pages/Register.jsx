import { useState } from "react";
import api from "../utils/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Reader",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    alert("Registered! Now login.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Register
        </h1>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 
            bg-white dark:bg-gray-700 
            text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 
            bg-white dark:bg-gray-700 
            text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 
            bg-white dark:bg-gray-700 
            text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Role
          </label>
          <select
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 
            bg-white dark:bg-gray-700 
            text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="Reader">Reader</option>
            <option value="Author">Author</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}