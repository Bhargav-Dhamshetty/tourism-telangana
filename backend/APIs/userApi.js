const express = require("express");
const User = require("../Models/userModel");
const expAsyncHandler = require("express-async-handler");
const router = express.Router();
const clerkAuth = require("../middlewares/clerkAuth");

// Register or Update User
router.post("/register", expAsyncHandler(async (req, res) => {
    const { clerkId, username, email, profileImageUrl } = req.body;

    if (!clerkId) {
        return res.status(400).json({ error: "Clerk ID is required!" });
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
        user = new User({ clerkId, username, email, profileImageUrl, favourites: [] });
    } else {
        user.username = username;
        user.email = email;
        user.profileImageUrl = profileImageUrl;
    }

    await user.save();
    console.log("User registered:", user);
    res.status(201).json({ message: "User registered successfully", user });
}));

// Get User Details
router.get("/details", clerkAuth, expAsyncHandler(async (req, res) => {
    const { clerkId } = req.user;
    const user = await User.findOne({ clerkId });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json({
        clerkId: user.clerkId,
        name: user.username,
        email: user.email,
        profileImage: user.profileImageUrl,
    });
}));

// Get User Favourites
router.get("/favourites", clerkAuth, expAsyncHandler(async (req, res) => {
    const user = await User.findOne({ clerkId: req.user.clerkId });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json(user.favourites);
}));

// Add to Favourites
router.post("/favourites", clerkAuth, expAsyncHandler(async (req, res) => {
    const { placeId } = req.body;
    const userId = req.user.clerkId;

    if (!placeId) {
        return res.status(400).json({ error: "Place ID is required!" });
    }

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
        user = new User({ clerkId: userId, favourites: [] });
    }

    if (!user.favourites.includes(placeId)) {
        user.favourites.push(placeId);
    }

    await user.save();
    res.json({ message: "Favourite added successfully", favourites: user.favourites });
}));

module.exports = router;
