import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import InputField from "../components/InputField";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const response = await api.post("/auth/login", formData);

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      setMessage("Login successful!");

      navigate("/dashboard");

    } catch (error) {
      setMessage(
        error.response?.data?.error ||
        "Login failed."
      );
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">
          Login
        </button>

      </form>

      <p>{message}</p>

      <p>
        Don't have an account?
        <Link to="/signup"> Sign Up</Link>
      </p>

    </div>
  );
}

export default Login;