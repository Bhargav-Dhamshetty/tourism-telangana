const express = require("express"); 
const Place = require("../Models/PlaceModel");
const User = require("../Models/userModel"); // Import User model
const expAsyncHandler = require("express-async-handler");
const clerkAuth = require("../middlewares/clerkAuth"); // Import authentication middleware
const router = express.Router();

// 1️⃣ Get details about all places
router.get("/all", expAsyncHandler(async (req, res) => {
    const places = await Place.find();
    res.status(200).json({ message: "Places fetched successfully", payload: places });
}));

// 2️⃣ Add a new place
router.post("/places", expAsyncHandler(async (req, res) => {
    const { name, description, image, location, latitude, longitude } = req.body;

    if (!name || !description || !image || !location || latitude == null || longitude == null) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newPlace = new Place({ name, description, image, location, latitude, longitude });
    await newPlace.save();

    res.status(201).json({ message: "Place added successfully", place: newPlace });
}));

// 3️⃣ Search places based on input
router.get("/search", expAsyncHandler(async (req, res) => {
    const { query } = req.query;
    if (!query) return res.json([]); // Return empty array if no input

    const places = await Place.find({
        $or: [
            { name: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } }
        ]
    });

    res.json(places);
}));

// 4️⃣ Get details of a single place by ID
router.get("/:id", expAsyncHandler(async (req, res) => {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ error: "Place not found" });

    res.json(place);
}));

// 5️⃣ Add a review to a place
router.post("/:id/review", expAsyncHandler(async (req, res) => {
    const { user, comment, rating } = req.body;

    if (!user || !comment || rating == null) {
        return res.status(400).json({ error: "All fields (user, comment, rating) are required" });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ error: "Place not found" });

    // Add new review
    place.reviews.push({ user, comment, rating });

    // Save updated place
    await place.save();

    res.status(201).json({ message: "Review added successfully", place });
}));

// 6️⃣ Get latitude and longitude of a place by ID
router.get("/:id/location", expAsyncHandler(async (req, res) => {
    try {
        const place = await Place.findById(req.params.id).select("latitude longitude");
        
        if (!place) {
            return res.status(404).json({ error: "Place not found" });
        }

        res.json({
            latitude: place.latitude,
            longitude: place.longitude
        });
    } catch (error) {
        console.error("Error fetching location:", error);
        res.status(500).json({ error: "Failed to retrieve location" });
    }
}));

// 7️⃣ Get User Favourites with Full Place Data
router.get("/favourites", clerkAuth, expAsyncHandler(async (req, res) => {
    const user = await User.findOne({ clerkId: req.user.clerkId }).populate("favourites");

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json(user.favourites); // Send full place details
}));

// 8️⃣ Add to Favourites (Ensuring Unique Places)
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
        await user.save();
    }

    await user.populate("favourites"); // Populate place details
    res.json({ message: "Favourite added successfully", favourites: user.favourites });
}));

module.exports = router;