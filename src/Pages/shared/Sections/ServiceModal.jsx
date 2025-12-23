import { motion } from "framer-motion";
import { FaTimes, FaCheck, FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";

const ServiceModal = ({ service, onClose }) => {
  const [date, setDate] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="
          max-w-lg w-full rounded-3xl p-10
          bg-gradient-to-br from-[#1f1c2c] via-[#928dab] to-[#1f1c2c]
          text-white
          shadow-[0_0_160px_rgba(147,51,234,1)]
          relative overflow-hidden
        "
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white z-10"
        >
          <FaTimes />
        </button>

        <div className="relative z-10">
          <h3 className="text-3xl font-extrabold mb-4">
            {service.title}
          </h3>

          <p className="opacity-90 mb-6">
            {service.description}
          </p>

          <ul className="space-y-2 mb-6">
            {service.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <FaCheck className="text-green-300" />
                {f}
              </li>
            ))}
          </ul>

          {/* Date Picker */}
          <label className="block mb-2 font-semibold">
            Select Service Date
          </label>
          <div className="flex items-center gap-3 mb-8">
            <FaCalendarAlt />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="
                w-full px-4 py-2 rounded-lg
                text-black focus:outline-none
              "
            />
          </div>

          <button
            disabled={!date}
            className="
              w-full py-3 rounded-full font-bold
              bg-white text-gray-900
              hover:bg-gray-200 transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            Confirm Booking
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceModal;
