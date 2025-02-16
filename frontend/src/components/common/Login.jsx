import React from 'react';
import { SignIn, UserButton, useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Login() {
  const { isSignedIn } = useUser(); // Get login state

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Check if user is logged in */}
      {!isSignedIn ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white p-8 rounded-2xl shadow-2xl"
        >
          <SignIn />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4"
        >
          {/* User Profile & Logout */}
          <UserButton afterSignOutUrl="/" />
          <Link
            to="/favourites"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            My Favourites
          </Link>
        </motion.div>
      )}
    </div>
  );
}

export default Login;

