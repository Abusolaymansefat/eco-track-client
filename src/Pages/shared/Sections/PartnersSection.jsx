import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { FaShieldAlt, FaHandshake, FaLeaf } from "react-icons/fa";

import logo1 from "../../../assets/img/logoipsum-372.png";
import logo2 from "../../../assets/img/logoipsum-373.png";
import logo4 from "../../../assets/img/logoipsum-375.png";
import logo5 from "../../../assets/img/logoipsum-378.png";
import logo6 from "../../../assets/img/logoipsum-380.png";
import logo8 from "../../../assets/img/logoipsum-382.png";

const PartnersSection = () => {
  const logos = [
    { src: logo1, name: "TechNova" },
    { src: logo2, name: "SecureX" },
    { src: logo4, name: "Cloudify" },
    { src: logo5, name: "NetCore" },
    { src: logo6, name: "DataWave" },
    { src: logo8, name: "GreenOps" },
  ];

  return (
    <section className="relative py-20 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-white to-white dark:from-black dark:via-black dark:to-black" />

      {/* Glow accents */}
      <div className="absolute -top-20 left-1/4 w-64 h-64 bg-orange-300/30 blur-3xl rounded-full" />
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-purple-300/30 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="
            text-3xl md:text-4xl font-extrabold mb-3
            bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500
            bg-clip-text text-transparent
          "
        >
          Trusted by Our Partners
        </motion.h2>

        <p className="max-w-3xl mx-auto mb-10 opacity-70">
          From software to security, our trusted partners help us deliver
          reliable, scalable, and eco-conscious solutions worldwide.
        </p>

        {/* Trust Badges */}
        <div className="flex justify-center gap-6 mb-12 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-black/60 backdrop-blur border">
            <FaHandshake className="text-indigo-500" />
            50+ Partners
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-black/60 backdrop-blur border">
            <FaShieldAlt className="text-green-500" />
            Verified Vendors
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-black/60 backdrop-blur border">
            <FaLeaf className="text-emerald-500" />
            Eco Friendly
          </div>
        </div>

        {/* Marquee */}
        <div className="rounded-3xl p-6 bg-white/70 dark:bg-black/60 backdrop-blur-xl border border-white/20 dark:border-gray-800 shadow-lg">
          <Marquee gradient={false} speed={45} pauseOnHover className="py-4">
            {logos.map((logo, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.15 }}
                className="mx-10 group relative"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="
                    h-12 md:h-14 object-contain
                    grayscale group-hover:grayscale-0
                    opacity-70 group-hover:opacity-100
                    transition duration-300
                  "
                />
                {/* Tooltip */}
                <span className="
                  absolute -bottom-8 left-1/2 -translate-x-1/2
                  text-xs px-2 py-1 rounded
                  bg-black text-white opacity-0
                  group-hover:opacity-100 transition
                ">
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
