const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // From JWT token
  name: { type: String, required: true },
  bio: { type: String },
});

module.exports = mongoose.model("Profile", profileSchema);
