import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import InputField from "../components/InputField";

function Signup() {
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

    if (formData.password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    try {
      await api.post("/auth/signup", formData);

      setMessage("Signup successful! You can now log in.");

      setFormData({
        email: "",
        password: "",
      });

    } catch (error) {
      setMessage(
        error.response?.data?.error ||
        "Signup failed."
      );
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Create Account</h2>

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
          Sign Up
        </button>

      </form>

      <p>{message}</p>

      <p>
        Already have an account?
        <Link to="/login"> Login</Link>
      </p>

    </div>
  );
}

export default Signup;