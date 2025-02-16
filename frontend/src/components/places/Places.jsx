import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Places() {
  const location = useLocation();
  const place = location.state?.place;

  if (!place) {
    return <div className="text-center text-gray-600">No place selected</div>;
  }

  return (
    <motion.div 
      className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img 
        src={place.image} 
        alt={place.name} 
        className="w-full h-80 object-cover rounded-md filter brightness-90 hover:brightness-110 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
      />
      <motion.h1 
        className="text-4xl font-bold text-gray-800 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {place.name}
      </motion.h1>
      <p className="text-gray-600 mt-2">{place.description}</p>
      <p className="text-sm text-gray-500 mt-1">📍 {place.location}</p>
      
      <motion.h2 
        className="text-xl font-semibold text-gray-700 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Reviews
      </motion.h2>
      <div className="mt-2">
        {place.reviews && place.reviews.length > 0 ? (
          place.reviews.map((review, index) => (
            <motion.p 
              key={index} 
              className="text-sm text-gray-600 italic border-l-4 border-gray-300 pl-2 py-1 bg-gray-100 rounded-md shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              "{review.comment}" - ⭐ {review.rating}/5
            </motion.p>
          ))
        ) : (
          <motion.p 
            className="text-sm text-gray-500 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            No reviews yet.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default Places;
