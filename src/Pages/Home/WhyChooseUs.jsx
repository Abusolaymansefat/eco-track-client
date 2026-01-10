// WhyChooseUs.jsx
import { motion } from "framer-motion";
import {
  FaRocket,
  FaTools,
  FaDollarSign,
  FaHeadset,
  FaShieldAlt,
  FaLeaf,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const points = [
    {
      icon: <FaRocket />,
      title: "Fast & Reliable",
      desc: "Lightning-fast service delivery with consistent performance.",
      stat: "99.9% Uptime",
      color: "from-indigo-500 via-purple-500 to-pink-500",
    },
    {
      icon: <FaTools />,
      title: "Expert Technicians",
      desc: "Certified engineers with years of hands-on experience.",
      stat: "120+ Experts",
      color: "from-emerald-500 via-teal-500 to-cyan-500",
    },
    {
      icon: <FaDollarSign />,
      title: "Affordable Pricing",
      desc: "Transparent pricing with no hidden costs.",
      stat: "30% Cheaper",
      color: "from-pink-500 via-rose-500 to-red-500",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Always available to help you anytime, anywhere.",
      stat: "24/7 Live",
      color: "from-blue-500 via-indigo-500 to-purple-500",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure & Trusted",
      desc: "Your data and privacy are always protected.",
      stat: "SSL Secured",
      color: "from-orange-500 via-yellow-500 to-amber-500",
    },
    {
      icon: <FaLeaf />,
      title: "Eco Friendly",
      desc: "Optimized processes to reduce environmental impact.",
      stat: "Green Certified",
      color: "from-green-500 via-lime-500 to-emerald-500",
    },
  ];

  return (
    <section className="relative py-10 px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="
          text-3xl md:text-4xl font-extrabold text-center mb-6
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
          bg-clip-text text-transparent
        "
      >
        Why Choose Us
      </motion.h2>

      <p className="text-center max-w-3xl mx-auto mb-14 opacity-80 text-gray-700">
        We combine speed, expertise, security, and sustainability to deliver
        world-class tech services.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {points.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10, boxShadow: "0 0 50px rgba(139,92,246,0.4)" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="
              relative p-8 rounded-3xl
              bg-gradient-to-br from-white/80 to-white/60
              backdrop-blur-xl
              border border-indigo-100
              shadow-[0_0_40px_rgba(0,0,0,0.15)]
              overflow-hidden
              transition-all duration-500
            "
          >
            {/* Gradient Glow */}
            <div
              className={`absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl opacity-50 bg-gradient-to-br ${p.color}`}
            />

            {/* Icon */}
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-xl mb-5 text-white text-3xl bg-gradient-to-br ${p.color} shadow-lg`}
            >
              {p.icon}
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold mb-2 text-gray-900">{p.title}</h3>
            <p className="opacity-80 mb-4 text-gray-700">{p.desc}</p>

            {/* Stat Badge */}
            <span
              className={`inline-block px-4 py-1 text-sm font-bold rounded-full bg-gradient-to-r ${p.color} text-white shadow-md`}
            >
              {p.stat}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
