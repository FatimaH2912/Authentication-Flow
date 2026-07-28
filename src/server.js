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

app.listen(PORT, () => {
  console.log(`Server running and connected to Supabase on port ${PORT}`);
});