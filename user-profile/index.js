const express = require("express");
const mongoose = require("mongoose");
const profileRoutes = require("./routes/profileRoutes");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/profile", profileRoutes);

app.listen(process.env.PORT, () => {
  console.log(`user-profile service running on port ${process.env.PORT}`);
});
