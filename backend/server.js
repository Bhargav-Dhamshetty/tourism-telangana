const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userApp = require("./APIs/userApi");
const placeApp = require("./APIs/placeApi");
const { requireAuth } = require("@clerk/express"); // ✅ Correct Clerk import

dotenv.config();

const app = express();


const allowedOrigins = [
    'https://tourism-telangana-cc9rm8k6j-bhargav-dhamshettys-projects.vercel.app'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Apply Clerk Authentication Middleware for user routes
app.use("/user-api", userApp);
app.use("/place-api", placeApp);

const port = process.env.PORT || 9000;

mongoose
    .connect(process.env.DBURL)
    .then(() => {
        app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
        console.log("✅ DB connection successful");
    })
    .catch((err) => console.error("❌ DB connection error:", err));