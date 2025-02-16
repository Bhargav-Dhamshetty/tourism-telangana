import React, { useEffect, useState } from "react";
import { SignUp, UserButton, useUser, useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

function Sign() {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // Prevent duplicate API calls

  useEffect(() => {
    const registerUser = async () => {
      if (isSignedIn && user && !isRegistered) {
        try {
          setLoading(true);
          const token = await getToken(); // ✅ Fetch Clerk Auth Token

          const userData = {
            clerkId: user.id,
            username: user.fullName || "Unknown User",
            email: user.primaryEmailAddress?.emailAddress || "No Email",
            profileImageUrl: user.profileImageUrl || "",
          };

          await axios.post("http://localhost:9000/user-api/register", userData, {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log("✅ User registered successfully");
          setIsRegistered(true); // ✅ Prevents multiple API calls
        } catch (error) {
          console.error("❌ Error registering user:", error?.response?.data || error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    registerUser();
  }, [isSignedIn, user, isRegistered, getToken]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-10">
      {!isSignedIn ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white p-6 md:p-8 rounded-xl shadow-xl w-full max-w-md"
        >
          <SignUp />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4"
        >
          <UserButton afterSignOutUrl="/" />
          {loading ? (
            <p className="text-gray-600">Registering user...</p>
          ) : (
            <Link
              to="/favourites"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition duration-300"
            >
              My Favourites
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default Sign;
