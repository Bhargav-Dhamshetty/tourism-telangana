const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userApp = require('./APIs/userApi');
const placeApp = require('./APIs/placeApi');
const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node"); // Ensure Clerk is properly required

dotenv.config();
const app = express();

// Debugging: Ensure .env variables are loaded
console.log("DB URL:", process.env.DBURL);
console.log("Port:", process.env.PORT || 6000);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Clerk Authentication Middleware (Placed AFTER CORS & JSON Middleware)
app.use(ClerkExpressWithAuth());

// API Routes
app.use('/user-api', userApp);
app.use('/place-api', placeApp);

// Database Connection & Server Start
const port = process.env.PORT || 6000;

(async () => {
    try {
        await mongoose.connect(process.env.DBURL); // ✅ Removed deprecated options
        console.log("✅ DB connection is Successful");
        app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
    } catch (error) {
        console.error("❌ DB connection error:", error);
        process.exit(1); // Exit process on DB failure
    }
})();
