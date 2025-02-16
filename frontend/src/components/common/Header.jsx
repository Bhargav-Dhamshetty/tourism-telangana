import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { UserButton, useUser, SignOutButton } from "@clerk/clerk-react";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  return (
    <div className="relative w-full bg-gradient-to-r from-yellow-500 via-orange-300 to-red-400 shadow-lg">
      {/* Sidebar Toggle Button */}
      <div 
        className="absolute top-4 left-4 text-white cursor-pointer z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Menu */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 80 }}
        className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-yellow-200 to-orange-300 text-black z-50 shadow-xl p-5 rounded-r-2xl"
      >
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 text-black"
          onClick={() => setIsSidebarOpen(false)}
        >
          <XMarkIcon className="h-7 w-7" />
        </button>

        {/* Sidebar Items */}
        <div className="mt-12 space-y-6">
          <Link 
            to="/placeslist" 
            className="block py-2 px-4 bg-white rounded-lg shadow-md hover:bg-orange-400 transition duration-300 text-center font-semibold"
            onClick={() => setIsSidebarOpen(false)}
          >
            Places List
          </Link>

          {!isSignedIn ? (
            <>
              <Link 
                to="/login" 
                className="block py-2 px-4 bg-white rounded-lg shadow-md hover:bg-blue-400 transition duration-300 text-center font-semibold"
                onClick={() => setIsSidebarOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="block py-2 px-4 bg-white rounded-lg shadow-md hover:bg-green-400 transition duration-300 text-center font-semibold"
                onClick={() => setIsSidebarOpen(false)}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/favourites" 
                className="block py-2 px-4 bg-white rounded-lg shadow-md hover:bg-purple-400 transition duration-300 text-center font-semibold"
                onClick={() => setIsSidebarOpen(false)}
              >
                Favourites
              </Link>
              <SignOutButton>
                <button 
                  className="block w-full py-2 px-4 bg-white rounded-lg shadow-md hover:bg-red-400 transition duration-300 text-center font-semibold"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Sign Out
                </button>
              </SignOutButton>
            </>
          )}
        </div>
      </motion.div>

      {/* Project Name & Tagline */}
            {/* Project Name & Tagline */}
            <div className="relative flex flex-col items-center justify-center h-32"> {/* Increased height from h-24 to h-32 for spacing */}
        <div className="flex mt-4"> {/* Added mt-4 for additional spacing */}
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="text-3xl md:text-5xl font-bold text-blue-700 drop-shadow-lg bg-white px-3 py-1 cursor-pointer"
          >
            <Link to="/" className="no-underline hover:no-underline text-blue-700" style={{ textDecorationLine: "none" }}>
              Telangana
            </Link>
          </motion.div>
          <motion.div
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-white ml-2 drop-shadow-lg bg-gradient-to-r from-yellow-400 to-red-600 px-3 py-1 cursor-pointer"
          >
            <Link to="/" className="no-underline hover:no-underline text-white" style={{ textDecorationLine: "none" }}>
              Tourism
            </Link>
          </motion.div>
        </div>


        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg font-medium text-white bg-gradient-to-r from-red-500 to-yellow-300 px-4 py-1 rounded-full mt-3 shadow-md"
        >
          "Discover the Culture, Explore the Heritage!"
        </motion.p>
      </div>

      {/* Buttons */}
      <div className="flex justify-end items-center max-w-7xl mx-auto px-4 py-3">
        {isSignedIn ? (
          <>
            <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-md shadow-md mx-4">
              <UserButton afterSignOutUrl="/" />
              <span className="text-sm font-medium text-gray-800">{user?.firstName}</span>
            </div>
            <Link to="/favourites">
              <button className="px-4 py-1.5 bg-purple-600 hover:bg-purple-800 text-white rounded-md text-sm shadow-md transition duration-300 mx-4">
                Favourites
              </button>
            </Link>
            <SignOutButton>
              <button className="px-4 py-1.5 bg-red-500 hover:bg-red-700 text-white rounded-md text-sm shadow-md transition duration-300">
                Sign Out
              </button>
            </SignOutButton>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-800 text-white rounded-md text-sm shadow-md transition duration-300 mx-4">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-1.5 bg-green-500 hover:bg-green-700 text-white rounded-md text-sm shadow-md transition duration-300 ">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
