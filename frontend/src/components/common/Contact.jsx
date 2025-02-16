import React from "react";
import { motion } from "framer-motion";

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Contact Us</h2>
        <p className="text-gray-500 mb-6">We’d love to hear from you! Feel free to reach out to us.</p>

        <form className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="Your Email" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          <textarea placeholder="Your Message" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 h-28"></textarea>
          <button className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 rounded-md transition">Send Message</button>
        </form>

        <div className="mt-6 text-center text-gray-600 text-sm">
          📍 Address: Hyderabad, Telangana <br />
          📧 Email: support@tourismtelangana.com <br />
          📞 Phone: 9346140353
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;
