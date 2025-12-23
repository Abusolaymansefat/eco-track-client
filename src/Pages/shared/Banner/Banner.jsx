import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  FaArrowRight,
  FaRocket,
  FaChevronDown,
} from "react-icons/fa";

import bannerimg1 from "../../../assets/banner/photo-1.avif";
import bannerimg2 from "../../../assets/banner/photo-2.avif";
import bannerimg3 from "../../../assets/banner/photo-3.avif";

/* Shared Variants */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto mt-6 overflow-hidden rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.35)]">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={4500}
        showStatus={false}
        transitionTime={900}
        swipeable
        emulateTouch
      >
        {/* ================= SLIDE 1 ================= */}
        <div className="relative">
          <motion.img
            src={bannerimg1}
            alt="Discover the Future"
            className="object-cover w-full h-[420px] sm:h-[520px] md:h-[650px]"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          />

          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            className="
              absolute inset-0
              bg-gradient-to-r from-black/80 via-black/50 to-black/80
              backdrop-blur-[3px]
              flex flex-col justify-center items-center
              text-white p-6 text-center
            "
          >
            <motion.h2
              variants={textVariants}
              className="
                text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4
                bg-gradient-to-r from-pink-400 via-sky-400 to-emerald-400
                bg-clip-text text-transparent
                drop-shadow-2xl
              "
            >
              Discover the Future
            </motion.h2>

            <motion.p
              variants={textVariants}
              className="text-sm sm:text-lg md:text-xl max-w-2xl opacity-90 mb-8"
            >
              Explore, upvote, and discover the best tech products & AI tools.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={textVariants}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link
                to="/products"
                className="
                  px-8 py-3 rounded-full font-bold
                  bg-gradient-to-r from-indigo-600 to-purple-600
                  hover:from-purple-600 hover:to-pink-600
                  transition flex items-center gap-2
                "
              >
                Explore Products <FaArrowRight />
              </Link>

              <Link
                to="/dashboard/addProduct"
                className="
                  px-8 py-3 rounded-full font-bold
                  bg-white/90 text-gray-900
                  hover:bg-white transition
                  flex items-center gap-2
                "
              >
                Submit Product <FaRocket />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ================= SLIDE 2 ================= */}
        <div className="relative">
          <motion.img
            src={bannerimg2}
            alt="Build & Share"
            className="object-cover w-full h-[420px] sm:h-[520px] md:h-[650px]"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          />

          <motion.div
            className="
              absolute inset-0
              bg-gradient-to-r from-indigo-900/80 via-indigo-700/50 to-indigo-900/80
              backdrop-blur-[3px]
              flex flex-col justify-center items-center
              text-white p-6 text-center
            "
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: 1,
                scale: 1,
                textShadow: [
                  "0px 0px 0px #fff",
                  "0px 0px 25px #60a5fa",
                  "0px 0px 0px #fff",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4"
            >
              Build & Share
            </motion.h2>

            <p className="text-sm sm:text-lg md:text-xl max-w-2xl opacity-90">
              Launch your product, get feedback, and grow with the community.
            </p>
          </motion.div>
        </div>

        {/* ================= SLIDE 3 ================= */}
        <div className="relative">
          <motion.img
            src={bannerimg3}
            alt="Join the Community"
            className="object-cover w-full h-[420px] sm:h-[520px] md:h-[650px]"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          />

          <motion.div
            className="
              absolute inset-0
              bg-gradient-to-r from-emerald-900/80 via-emerald-700/50 to-emerald-900/80
              backdrop-blur-[3px]
              flex flex-col justify-center items-center
              text-white p-6 text-center
            "
          >
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                y: 0,
                letterSpacing: ["0px", "3px", "0px"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4"
            >
              Join the Tech Community
            </motion.h2>

            <p className="text-sm sm:text-lg md:text-xl max-w-2xl opacity-90">
              Vote, review & connect with builders worldwide.
            </p>
          </motion.div>
        </div>
      </Carousel>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white opacity-80">
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FaChevronDown />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
