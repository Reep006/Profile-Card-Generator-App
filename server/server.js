const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
// POST API
app.post("/create-profile", (req, res) => {
  const { name, bio, image } = req.body;
  // Validation
  if (!name || !bio || !image) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  // Send formatted data
  res.json({
    success: true,
    profile: {
      fullName: name.toUpperCase(),
      description: bio,
      profileImage: image,
      joined: "Member of Profile App",
    },
  });
});
// Default Route
app.get("/", (req, res) => {
  res.send("Profile Card Generator Backend Running");
});
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});