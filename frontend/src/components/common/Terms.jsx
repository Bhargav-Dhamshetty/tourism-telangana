import React from "react";
import { motion } from "framer-motion";

function Terms() {
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl max-w-2xl"
      >
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Terms & Conditions</h2>
        <p className="text-gray-500 mb-6">By using our services, you agree to our terms and conditions.</p>

        <h3 className="text-lg font-semibold text-gray-600 mt-4">1. Acceptance of Terms</h3>
        <p className="text-gray-500">By accessing our website, you accept these terms in full.</p>

        <h3 className="text-lg font-semibold text-gray-600 mt-4">2. User Responsibilities</h3>
        <p className="text-gray-500">Users must not misuse our services or engage in illegal activities.</p>

        <h3 className="text-lg font-semibold text-gray-600 mt-4">3. Changes to Terms</h3>
        <p className="text-gray-500">We reserve the right to modify these terms at any time.</p>

        <p className="mt-6 text-sm text-gray-600">For any concerns, contact us.</p>
      </motion.div>
    </div>
  );
}

export default Terms;
