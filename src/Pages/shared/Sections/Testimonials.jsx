import { motion } from "framer-motion";
import {
  FaQuoteLeft,
  FaStar,
  FaLeaf,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaTools,
} from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rahim Uddin",
      role: "Software Engineer",
      country: "Bangladesh",
      service: "Mobile Repair",
      ecoScore: 82,
      date: "March 2025",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      feedback:
        "The mobile repair service was fantastic. My phone works like new!",
    },
    {
      name: "Fatema Begum",
      role: "Entrepreneur",
      country: "India",
      service: "Network Setup",
      ecoScore: 74,
      date: "February 2025",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4,
      feedback:
        "Quick and reliable network setup. Highly recommend their team.",
    },
    {
      name: "Jamal Khan",
      role: "Freelancer",
      country: "Pakistan",
      service: "Laptop Service",
      ecoScore: 88,
      date: "January 2025",
      photo: "https://randomuser.me/api/portraits/men/56.jpg",
      rating: 5,
      feedback:
        "Affordable prices and great customer service. Will use again!",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto text-center">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        💬 Trusted by Eco-Conscious Users
      </motion.h2>

      <p className="max-w-2xl mx-auto mb-14 opacity-70">
        Real reviews from verified users who chose sustainable tech services.
      </p>

      {/* Auto Scroll Container */}
      <motion.div
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 35,
          ease: "linear",
        }}
        className="flex gap-8 w-max"
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <div
            key={i}
            className="
              w-[320px] sm:w-[360px]
              p-6 rounded-2xl
              bg-white/70 dark:bg-black/60
              backdrop-blur-xl
              border border-white/20 dark:border-gray-800
              shadow-lg
              text-left
              relative
            "
          >
            {/* Quote */}
            <FaQuoteLeft className="absolute -top-4 -left-4 text-3xl text-green-500 opacity-80" />

            {/* Rating */}
            <div className="flex gap-1 mb-3 text-yellow-400">
              {[...Array(5)].map((_, idx) => (
                <FaStar
                  key={idx}
                  className={idx < t.rating ? "opacity-100" : "opacity-20"}
                />
              ))}
            </div>

            {/* Feedback */}
            <p className="italic opacity-80 mb-4">“{t.feedback}”</p>

            {/* User Info */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={t.photo}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
              />
              <div>
                <p className="font-semibold flex items-center gap-2">
                  {t.name}
                  <FaCheckCircle className="text-green-500 text-sm" />
                </p>
                <p className="text-sm opacity-60">{t.role}</p>
              </div>
            </div>

            {/* Extra User Data */}
            <div className="text-xs opacity-70 space-y-1">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-500" /> {t.country}
              </p>
              <p className="flex items-center gap-2">
                <FaTools className="text-green-500" /> {t.service}
              </p>
              <p className="flex items-center gap-2">
                <FaLeaf className="text-green-500" />
                Eco Score: {t.ecoScore}
              </p>
              <p>Reviewed on: {t.date}</p>
            </div>

            {/* Eco Badge */}
            <div className="absolute top-4 right-4 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
              <FaLeaf /> Eco Verified
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
