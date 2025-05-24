const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Import routes
const outfitRoutes = require("./routers/outfitRoutes");
const wishlistRoutes = require("./routers/WishlistRoutes");
const cartRoutes = require("./routers/CartRoutes");
const quizRoutes = require("./routers/QuizRoutes");
const authRoutes = require("./routers/auth"); // <-- Add this auth route import

// Use routes
app.use("/api/outfits", outfitRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/auth", authRoutes); // <-- Auth routes
app.use("/uploads", express.static("uploads"));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
