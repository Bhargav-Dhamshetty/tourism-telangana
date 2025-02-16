import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const images = [
  "https://images.pexels.com/photos/12968097/pexels-photo-12968097.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/13193275/pexels-photo-13193275.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://media.istockphoto.com/id/899422090/photo/pathirakali-amman-temple-trincomalee.jpg?b=1&s=612x612&w=0&k=20&c=Fx-NiuQyunv_M3Dj89im7x1AE3G4Ds1hVxjiLZ4u9mA=",
  "https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/5615622/pexels-photo-5615622.jpeg?auto=compress&cs=tinysrgb&w=1200"
];

const typewriterTexts = [
  "Discover The Beauty Of Telangana",
  "Explore Hidden Gems",
  "Adventure Awaits You"
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(typewriterTexts[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(imageInterval);
  }, []);

  useEffect(() => {
    let textIndex = 0;
    const textChangeInterval = setInterval(() => {
      textIndex = (textIndex + 1) % typewriterTexts.length;
      setDisplayedText(typewriterTexts[textIndex]);
    }, 4000);
    return () => clearInterval(textChangeInterval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Carousel */}
      <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <img src={images[currentIndex]} alt="Tourist spot" className="w-full h-full object-cover transition-opacity duration-700" />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-yellow-400">
            {displayedText}
          </h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/signup")}
            className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-lg transition"
          >
            Get Started
          </motion.button>
        </div>
        
        {/* Manual Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/50 p-2 rounded-full hover:bg-gray-600"
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/50 p-2 rounded-full hover:bg-gray-600"
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Home;