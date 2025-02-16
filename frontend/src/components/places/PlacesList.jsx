import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PlacesList = () => {
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [reviewText, setReviewText] = useState({});
  const [reviewRating, setReviewRating] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get("http://localhost:9000/place-api/all");
      setPlaces(response.data.payload);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const searchPlaces = async (query) => {
    if (!query.trim()) {
      fetchPlaces();
      return;
    }
    try {
      const response = await axios.get(`http://localhost:9000/place-api/search?query=${query}`);
      setPlaces(response.data);
    } catch (error) {
      console.error("Error searching places:", error);
    }
  };

  const handleMapNavigation = async (placeId) => {
    try {
      const response = await axios.get(`http://localhost:9000/place-api/${placeId}/location`);
      const location = response.data;
      if (location) {
        window.open(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`, "_blank");
      } else {
        alert("Failed to retrieve location");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const submitReview = async (placeId) => {
    if (!reviewText[placeId] || !reviewRating[placeId]) {
      alert("Please enter both a review and rating.");
      return;
    }
    try {
      await axios.post(`http://localhost:9000/place-api/${placeId}/review`, {
        user: "Guest User",
        comment: reviewText[placeId],
        rating: parseInt(reviewRating[placeId]),
      });
      fetchPlaces();
      setReviewText((prev) => ({ ...prev, [placeId]: "" }));
      setReviewRating((prev) => ({ ...prev, [placeId]: "" }));
      alert("Review added successfully!");
    } catch (error) {
      console.error("Error posting review:", error);
      alert("Failed to post review. Please try again.");
    }
  };

  const addToFavourites = (place) => {
    const savedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const updatedFavourites = [...savedFavourites, place];
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    navigate("/favourites");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Famous Places</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search places..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            searchPlaces(e.target.value);
          }}
          className="w-96 px-4 py-2 border rounded-lg shadow-md outline-none"
        />
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {places.map((place) => (
          <motion.div
            key={place._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
          >
            {/* Image and Main Content - Click triggers navigation */}
            <div onClick={() => navigate("/places", { state: { place } })}>
              <img src={place.image} alt={place.name} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-gray-800">{place.name}</h3>
                <p className="text-gray-600 mt-2">{place.description.substring(0, 100)}...</p>
                <p className="text-sm text-gray-500 mt-1">📍 {place.location}</p>
              </div>
            </div>

            <div className="border-t p-4">
              <h4 className="text-lg font-semibold text-gray-700">Reviews</h4>

              <div className="mt-2">
                {place.reviews && place.reviews.length > 0 ? (
                  place.reviews.map((review, index) => (
                    <p key={index} className="text-sm text-gray-600 italic">
                      "{review.comment}" - ⭐ {review.rating}/5
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No reviews yet.</p>
                )}
              </div>

              {/* Review Inputs */}
              <input
                type="text"
                placeholder="Write a review..."
                value={reviewText[place._id] || ""}
                onChange={(e) => setReviewText((prev) => ({ ...prev, [place._id]: e.target.value }))}
                className="w-full mt-2 px-3 py-2 border rounded-md outline-none"
                onClick={(e) => e.stopPropagation()} // Prevent navigation
              />
              <select
                value={reviewRating[place._id] || ""}
                onChange={(e) => setReviewRating((prev) => ({ ...prev, [place._id]: e.target.value }))}
                className="w-full mt-2 px-3 py-2 border rounded-md outline-none"
                onClick={(e) => e.stopPropagation()} // Prevent navigation
              >
                <option value="">Select Rating</option>
                <option value="1">⭐ 1</option>
                <option value="2">⭐ 2</option>
                <option value="3">⭐ 3</option>
                <option value="4">⭐ 4</option>
                <option value="5">⭐ 5</option>
              </select>

              {/* Buttons */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation
                    submitReview(place._id);
                  }}
                  className="w-1/2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-800"
                >
                  Submit Review
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation
                    addToFavourites(place);
                  }}
                  className="w-1/2 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-800"
                >
                  Add to Favourites
                </button>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation
                  handleMapNavigation(place._id);
                }}
                className="text-blue-500 mt-2 inline-block"
              >
                View on Google Maps
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PlacesList;