import { LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 max-w-md"
      >
        <div className="flex justify-center mb-4">
          <LockKeyhole className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          403 Forbidden
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Oops! You don’t have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Forbidden;