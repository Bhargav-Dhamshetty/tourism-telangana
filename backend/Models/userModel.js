const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  username: String,
  email: String,
  profileImageUrl: String,
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }] // Reference Place model
});

module.exports = mongoose.model("User", userSchema);
