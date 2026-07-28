require("dotenv").config();

const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());


// Create a Supabase client using the environment variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const PORT = process.env.PORT || 3000;


// Endpoint for user signup
app.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required"
    });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    return res.status(400).json({
      error: error.message
    });
  }

  return res.status(201).json(data);
});


// Endpoint for user login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required"
    });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return res.status(401).json({
      error: "Invalid login credentials"
    });
  }

  return res.status(200).json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token
  });
});

// Public endpoint
app.get("/public/info", (req, res) => {
  return res.status(200).json({
    message: "Welcome stranger! This info is public."
  });
});

// Protected endpoint (token not verified yet)
app.get("/protected/profile", (req, res) => {
  const authHeader = req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      error: "Access token required"
    });
  }

  return res.status(200).json({
    message: "Token received. Verification comes in Stage 3."
  });
});

app.listen(PORT, () => {
  console.log(`Server running and connected to Supabase on port ${PORT}`);
});