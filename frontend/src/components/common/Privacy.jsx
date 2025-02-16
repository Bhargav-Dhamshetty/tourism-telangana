import React from "react";
import { motion } from "framer-motion";

function Privacy() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl max-w-2xl"
      >
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Privacy Policy</h2>
        <p className="text-gray-500 mb-6">Your privacy is important to us. This policy explains how we handle your information.</p>

        <h3 className="text-lg font-semibold text-gray-600 mt-4">1. Information We Collect</h3>
        <p className="text-gray-500">We collect personal information such as name, email, and contact details when you use our services.</p>

        <h3 className="text-lg font-semibold text-gray-600 mt-4">2. How We Use Your Data</h3>
        <p className="text-gray-500">Your data is used for improving our services, personalization, and communication.</p>

        <h3 className="text-lg font-semibold text-gray-600 mt-4">3. Security Measures</h3>
        <p className="text-gray-500">We implement advanced security measures to protect your data from unauthorized access.</p>

        <p className="mt-6 text-sm text-gray-600">If you have any questions, feel free to contact us.</p>
      </motion.div>
    </div>
  );
}

export default Privacy;

