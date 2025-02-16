import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white py-6"
    >
      <div className="max-w-6xl mx-auto px-4 h-50">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {/* About Section */}
          <div>
            <h3 className="text-md font-semibold mb-2">About Us</h3>
            <p className="text-gray-300">
              Discover the best places to visit with our tourism platform. Plan your trip effortlessly with reviews, guides, and recommendations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-md font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li><a href="/placeslist" className="hover:text-yellow-400 transition">📍 Places List</a></li>
              <li><a href="/contact" className="hover:text-yellow-400 transition">📞 Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-yellow-400 transition">🔒 Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-yellow-400 transition">📜 Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-md font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-yellow-400 transition"><FaFacebook size={18} /></a>
              <a href="#" className="hover:text-yellow-400 transition"><FaInstagram size={18} /></a>
              <a href="#" className="hover:text-yellow-400 transition"><FaTwitter size={18} /></a>
              <a href="#" className="hover:text-yellow-400 transition"><FaYoutube size={18} /></a>
            </div>
          </div>
        </div>

        {/* Copyright & Contact */}
        <div className="border-t border-gray-600 mt-4 pt-2 text-center text-xs text-gray-300">
          <p>&copy; {new Date().getFullYear()} Tourism Telangana. All rights reserved.</p>
          <p>📞 Contact: 9346140353</p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
