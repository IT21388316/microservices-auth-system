const express = require("express");
const Profile = require("../models/Profile");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Create Profile (Protected)
router.post("/", authenticateToken, async (req, res) => {
  const { name, bio } = req.body;
  const userId = req.user.userId;
  try {
    const profile = new Profile({ userId, name, bio });
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).send("Error creating profile: " + err.message);
  }
});

// Get Profile by ID (Protected)
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).send("Profile not found");
    res.json(profile);
  } catch (err) {
    res.status(500).send("Error fetching profile: " + err.message);
  }
});

// Update Profile (Protected)
router.put("/:id", authenticateToken, async (req, res) => {
  const { name, bio } = req.body;
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { name, bio },
      { new: true }
    );
    if (!profile) return res.status(404).send("Profile not found");
    res.json(profile);
  } catch (err) {
    res.status(500).send("Error updating profile: " + err.message);
  }
});

// Delete Profile (Protected)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).send("Profile not found");
    res.send("Profile deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting profile: " + err.message);
  }
});

module.exports = router;
