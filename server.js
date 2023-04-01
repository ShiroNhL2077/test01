const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const cors = require("cors");

const returnerRoutes = require("./routes/returnerRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://luffy9b:luffy9b@cluster0.j0fvsip.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

// Link API routes
app.use("/api/returner", returnerRoutes);
app.use("/api/user", userRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
