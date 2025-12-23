import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import bannerimg1 from "../../../assets/banner/photo-1.avif";
import bannerimg2 from "../../../assets/banner/photo-2.avif";
import bannerimg3 from "../../../assets/banner/photo-3.avif";

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
    <div className="max-w-7xl mx-auto mt-5 overflow-hidden">
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
        {/* ---------- Slide 1 ---------- */}
        <div className="relative">
          <motion.img
            src={bannerimg1}
            alt="Slide 1"
            className="object-cover w-full h-[420px] sm:h-[520px] md:h-[650px]"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          />

          {/* Glass Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            className="
              absolute inset-0
              bg-gradient-to-r
              from-black/70 via-black/40 to-black/70
              dark:from-white/40 dark:via-white/20 dark:to-white/40
              backdrop-blur-[2px]
              flex flex-col justify-center items-center
              text-white dark:text-gray-900
              p-6 text-center
            "
          >
            <motion.h2
              variants={textVariants}
              className="
                text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4
                bg-gradient-to-r from-pink-400 via-blue-400 to-green-400
                bg-clip-text text-transparent
                drop-shadow-lg
              "
            >
              Discover the Future
            </motion.h2>

            <motion.p
              variants={textVariants}
              className="text-sm sm:text-lg md:text-xl max-w-2xl opacity-90"
            >
              Explore and upvote the latest web apps, AI tools, and digital
              products.
            </motion.p>
          </motion.div>
        </div>

        {/* ---------- Slide 2 ---------- */}
        <div className="relative">
          <motion.img
            src={bannerimg2}
            alt="Slide 2"
            className="object-cover w-full h-[420px] sm:h-[520px] md:h-[650px]"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          />

          <motion.div
            className="
              absolute inset-0
              bg-gradient-to-r
              from-indigo-900/70 via-indigo-700/40 to-indigo-900/70
              dark:from-white/40 dark:via-white/20 dark:to-white/40
              backdrop-blur-[2px]
              flex flex-col justify-center items-center
              text-white dark:text-gray-900
              p-6 text-center
            "
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                textShadow: [
                  "0px 0px 0px #fff",
                  "0px 0px 20px #60a5fa",
                  "0px 0px 0px #fff",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4"
            >
              Build & Share
            </motion.h2>

            <p className="text-sm sm:text-lg md:text-xl max-w-2xl opacity-90">
              Submit your own tech product and get discovered by the world.
            </p>
          </motion.div>
        </div>

        {/* ---------- Slide 3 ---------- */}
        <div className="relative">
          <motion.img
            src={bannerimg3}
            alt="Slide 3"
            className="object-cover w-full h-[420px] sm:h-[520px] md:h-[650px]"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          />

          <motion.div
            className="
              absolute inset-0
              bg-gradient-to-r
              from-emerald-900/70 via-emerald-700/40 to-emerald-900/70
              dark:from-white/40 dark:via-white/20 dark:to-white/40
              backdrop-blur-[2px]
              flex flex-col justify-center items-center
              text-white dark:text-gray-900
              p-6 text-center
            "
          >
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                y: 0,
                letterSpacing: ["0px", "3px", "0px"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4"
            >
              Join the Tech Community
            </motion.h2>

            <p className="text-sm sm:text-lg md:text-xl max-w-2xl opacity-90">
              Vote, review, and connect with fellow developers and creators.
            </p>
          </motion.div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
