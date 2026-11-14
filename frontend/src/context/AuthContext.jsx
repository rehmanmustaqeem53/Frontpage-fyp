
import {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check logged-in user
  const checkUser = useCallback(async () => {
    try {
      const res = await api.get("/auth/me");

      setUser(res.data.user);
    } catch (error) {
      console.error(
        "Check User Error:",
        error.response?.data || error.message
      );

      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check authentication when app loads
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  // Login
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      setUser(res.data.user);

      return res.data;
    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data || error.message
      );

      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await api.get("/auth/logout");

      setUser(null);
    } catch (error) {
      console.error(
        "Logout Error:",
        error.response?.data || error.message
      );

      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        checkUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
