import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav
      className={`p-4 flex justify-between items-center
        ${darkMode ? "bg-gray-800 text-white" : "bg-gray-900 text-white"}`}
    >
      <Link to="/" className="text-xl font-bold">
        Frontpage
      </Link>

      <div className="space-x-4 flex items-center">
        <Link to="/blogs">Blogs</Link>
             <Link to="/about">About</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user?.role === "Author" && <Link to="/dashboard">Dashboard</Link>}

        {user && <button onClick={logout}>Logout</button>}

        {/* Dark Mode Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-3 py-1 rounded ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-700 text-black"
          }`}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}