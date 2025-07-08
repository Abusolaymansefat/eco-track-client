import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import bannerimg1 from "../../../assets/banner/photo-1.avif";
import bannerimg2 from "../../../assets/banner/photo-2.avif";
import bannerimg3 from "../../../assets/banner/photo-3.avif";



const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={4000}
        showStatus={false}
        transitionTime={400}
        fadeInUp
      >
        {/* Slide 1 */}
        <div className="relative">
          <img
            src={bannerimg1}
            alt="Slide 1"
            className="object-cover w-full h-[500px]"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white p-5 text-center">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                color: ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#f87171"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              Discover the Future
            </motion.h2>
            <p className="text-lg md:text-xl max-w-xl">
              Explore and upvote the latest web apps, AI tools, and digital
              products.
            </p>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative">
          <img
            src={bannerimg2}
            alt="Slide 2"
            className="object-cover w-full h-[500px]"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white p-5 text-center">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                color: ["#3515c8 ", "#60a5fa", "#264b51 ", "#fbbf24", "#18117a "],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              Build & Share
            </motion.h2>
            <p className="text-lg md:text-xl max-w-xl">
              Submit your own tech product and get discovered by the world.
            </p>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative">
          <img
            src={bannerimg3}
            alt="Slide 3"
            className="object-cover w-full h-[500px]"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white p-5 text-center">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                color: ["#f87171", "#9dbaab", "#1d90ca ", "#0ac3e0 ", "#0e4342"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              Join the Tech Community
            </motion.h2>
            <p className="text-lg md:text-xl max-w-xl">
              Vote, review, and connect with fellow developers and creators.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
