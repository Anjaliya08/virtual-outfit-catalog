const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS middleware with specific origins allowed
app.use(cors({
  origin: [
    "https://your-cloudflare-domain.com", // Replace with your actual Cloudflare domain
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// Import routes
const authRoutes = require("./routers/auth");
const outfitRoutes = require("./routers/outfitRoutes");
const wishlistRoutes = require("./routers/WishlistRoutes");
const cartRoutes = require("./routers/CartRoutes");
const quizRoutes = require("./routers/QuizRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/outfits", outfitRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/uploads", express.static("uploads"));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
