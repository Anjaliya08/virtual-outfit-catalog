import React, { useState } from "react";
import "./AuthForm.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("/api/auth/register", formData);
      navigate("/login");
    } catch (err) {
      // Show backend error message if available, else fallback text
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          required
          onChange={handleChange}
          minLength={2}
          maxLength={50}
          autoComplete="name"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          required
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          required
          onChange={handleChange}
          minLength={6}
          autoComplete="new-password"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
