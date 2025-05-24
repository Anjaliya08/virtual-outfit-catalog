import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
const AuthContext = createContext();

// Hook for easy access
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // Store user info
  const [loading, setLoading] = useState(true); // For initial loading state

  // Check if token exists in localStorage and fetch user data on app load
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Optional: set token in axios headers for future requests
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          // You can create a /me or /profile endpoint to get user info
          const res = await axios.get("/api/auth/me");
          setUser(res.data);
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Login function: Save token, fetch user data, update context
  const login = async (email, password) => {
    const res = await axios.post("/api/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    const userRes = await axios.get("/api/auth/me");
    setUser(userRes.data);
  };

  // Logout function: Clear token and user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
