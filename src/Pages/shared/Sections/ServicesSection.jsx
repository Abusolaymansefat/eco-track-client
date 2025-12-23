// ServicesSection.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaMobileAlt,
  FaWifi,
  FaCheckCircle,
  FaLeaf,
} from "react-icons/fa";
import ServiceModal from "./ServiceModal";

import service2 from "../../../assets/luke-hodde-Z-UuXG6iaA8-unsplash.jpg";
import service3 from "../../../assets/nathan-anderson-KHSPGJ3zP0M-unsplash.jpg";

const services = [
  {
    image: service2,
    title: "Mobile Repair Services",
    description:
      "Fast, reliable smartphone repair using genuine parts and expert care.",
    features: [
      "Screen replacement",
      "Charging port repair",
      "Advanced diagnostics",
    ],
    icon: <FaMobileAlt />,
    stat: "10K+ Devices Fixed",
    badge: "Most Popular",
    gradient:
      "from-[#ff416c] via-[#b721ff] to-[#3f5efb]",
  },
  {
    image: service3,
    title: "Network Setup Services",
    description:
      "Enterprise-grade network setup and secure WiFi optimization.",
    features: [
      "Router installation",
      "WiFi optimization",
      "Security hardening",
    ],
    icon: <FaWifi />,
    stat: "99.9% Uptime",
    badge: "Enterprise",
    gradient:
      "from-[#11998e] via-[#38ef7d] to-[#1d976c]",
  },
];

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(null);

  return (
    <section className="relative max-w-7xl mx-auto px-4 py-8">
      {/* Title */}
      <h2
        className="
          text-4xl font-extrabold text-center mb-6
          bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
          bg-clip-text text-transparent
        "
      >
        Our Services
      </h2>

      <p className="text-center max-w-3xl mx-auto mb-24 opacity-70">
        High-performance, secure & eco-friendly tech services designed for
        modern users.
      </p>

      <div className="space-y-10">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-14 items-center"
          >
            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.45)]"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[380px] object-cover"
              />
            </motion.div>

            {/* Content (THICK) */}
            <div
              className={`
                relative p-12 rounded-3xl
                bg-gradient-to-br ${service.gradient}
                text-white overflow-hidden
                shadow-[0_0_140px_rgba(99,102,241,1)]
                border border-white/30
              `}
            >
              {/* Dark overlay for thickness */}
              <div className="absolute inset-0 bg-black/45" />

              {/* Glow */}
              <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/40 blur-[160px]" />

              <div className="relative z-10">
                {/* Badge */}
                <span className="absolute top-0 right-0 text-xs px-3 py-1 rounded-full bg-black/70 flex items-center gap-1">
                  <FaLeaf /> {service.badge}
                </span>

                <div className="text-4xl mb-4 drop-shadow-xl">
                  {service.icon}
                </div>

                <h3 className="text-3xl font-extrabold mb-4 drop-shadow-2xl">
                  {service.title}
                </h3>

                <p className="text-white/90 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-300" />
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="font-semibold mb-8">
                  ⭐ {service.stat}
                </p>

                <button
                  onClick={() => setActiveService(service)}
                  className="
                    px-8 py-3 rounded-full font-bold
                    bg-white text-gray-900
                    hover:bg-gray-200 transition
                  "
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {activeService && (
        <ServiceModal
          service={activeService}
          onClose={() => setActiveService(null)}
        />
      )}
    </section>
  );
};

export default ServicesSection;
