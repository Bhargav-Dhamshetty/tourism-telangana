import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const savedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(savedFavourites);
  }, []);

  const removeFavourite = (id) => {
    const updatedFavourites = favourites.filter((place) => place._id !== id);
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.h1 
        className="text-5xl font-extrabold text-center text-red-600 mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Your Favourites ❤️
      </motion.h1>

      {favourites.length === 0 ? (
        <motion.p
          className="text-center text-gray-500 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          No favourites added yet.
        </motion.p>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence>
            {favourites.map((place) => (
              <motion.div
                key={place._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <motion.img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-60 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="p-4">
                  <h3 className="text-2xl font-semibold text-gray-800">{place.name}</h3>
                  <p className="text-gray-600 mt-2">{place.description.substring(0, 100)}...</p>
                </div>

                <motion.button
                  onClick={() => removeFavourite(place._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg"
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ❌
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default Favourites;
