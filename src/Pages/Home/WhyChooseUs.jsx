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
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <FaTools />,
      title: "Expert Technicians",
      desc: "Certified engineers with years of hands-on experience.",
      stat: "120+ Experts",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <FaDollarSign />,
      title: "Affordable Pricing",
      desc: "Transparent pricing with no hidden costs.",
      stat: "30% Cheaper",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Always available to help you anytime, anywhere.",
      stat: "24/7 Live",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure & Trusted",
      desc: "Your data and privacy are always protected.",
      stat: "SSL Secured",
      color: "from-orange-500 to-yellow-500",
    },
    {
      icon: <FaLeaf />,
      title: "Eco Friendly",
      desc: "Optimized processes to reduce environmental impact.",
      stat: "Green Certified",
      color: "from-green-500 to-lime-500",
    },
  ];

  return (
    <section className="relative py-5 px-6 max-w-7xl mx-auto">
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

      <p className="text-center max-w-3xl mx-auto mb-14 opacity-70">
        We combine speed, expertise, security, and sustainability to deliver
        world-class tech services.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {points.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="
              relative p-8 rounded-3xl
              bg-white/70 dark:bg-black/60
              backdrop-blur-xl
              border border-white/20 dark:border-gray-800
              shadow-[0_0_30px_rgba(0,0,0,0.08)]
              overflow-hidden
            "
          >
            {/* Gradient Glow */}
            <div
              className={`absolute -top-20 -right-20 w-52 h-52 rounded-full blur-3xl opacity-30 bg-gradient-to-br ${p.color}`}
            />

            {/* Icon */}
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-xl mb-5 text-white text-2xl bg-gradient-to-br ${p.color}`}
            >
              {p.icon}
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
            <p className="opacity-70 mb-4">{p.desc}</p>

            {/* Stat Badge */}
            <span
              className={`
                inline-block px-4 py-1 text-sm font-semibold rounded-full
                bg-gradient-to-r ${p.color} text-white
              `}
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
