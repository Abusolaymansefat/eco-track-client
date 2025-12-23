import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Slider from "react-slick";
import { FaCopy, FaGift, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../../DashboardLayout/DashboardHome/Loading";
import { toast } from "react-toastify";

const gradientAnim = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  },
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "linear",
  },
};

const CouponSlider = () => {
  const axiosSecure = useAxios();
  const [copiedId, setCopiedId] = useState(null);

  const {
    data: coupons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data.filter(
        (coupon) => new Date(coupon.expiry) >= new Date()
      );
    },
  });

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1200,
    autoplaySpeed: 4500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success("Coupon code copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading)
    return (
      <div className="py-14 text-center">
        <Loading />
      </div>
    );

  if (isError)
    return (
      <p className="text-center py-10 text-red-600">
        Failed to load coupons.
      </p>
    );

  if (coupons.length === 0)
    return (
      <p className="text-center py-10 opacity-70">
        No active coupons available.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          text-3xl sm:text-4xl font-extrabold text-center mb-10
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
          bg-clip-text text-transparent
        "
      >
        🎁 Exclusive Discount Coupons
      </motion.h2>

      <Slider {...settings}>
        {coupons.map((coupon) => {
          const daysLeft = Math.ceil(
            (new Date(coupon.expiry) - new Date()) /
              (1000 * 60 * 60 * 24)
          );

          return (
            <div key={coupon._id} className="px-2">
              <motion.div
                className="
                  relative h-72 sm:h-80 rounded-3xl
                  text-white overflow-hidden
                  p-6 flex flex-col justify-between
                  shadow-[0_0_60px_rgba(139,92,246,0.9)]
                "
                style={{
                  backgroundSize: "300% 300%",
                  backgroundImage:
                    "linear-gradient(120deg,#6366f1,#8b5cf6,#ec4899,#22c55e)",
                }}
                {...gradientAnim}
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Floating Glow */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-16 -right-16 w-56 h-56 bg-pink-400/40 rounded-full blur-3xl"
                />

                {/* Header */}
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <FaGift /> Limited Offer
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock />
                    {daysLeft > 0 ? `${daysLeft} days left` : "Last day"}
                  </span>
                </div>

                {/* Code */}
                <div className="text-center">
                  <h3 className="text-3xl sm:text-5xl font-black tracking-widest mb-2 drop-shadow-lg">
                    {coupon.code}
                  </h3>
                  <p className="opacity-90 text-sm sm:text-base">
                    {coupon.description}
                  </p>
                </div>

                {/* Discount */}
                <p className="text-center text-2xl sm:text-3xl font-bold text-green-300">
                  {coupon.discount}% OFF
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <p className="text-xs opacity-80">
                    Expires:{" "}
                    {new Date(coupon.expiry).toLocaleDateString()}
                  </p>

                  <button
                    onClick={() =>
                      handleCopy(coupon.code, coupon._id)
                    }
                    className="
                      flex items-center gap-2
                      bg-black/30 hover:bg-black/40
                      px-4 py-2 rounded-full
                      text-sm font-semibold
                      transition
                    "
                  >
                    <FaCopy />
                    {copiedId === coupon._id
                      ? "Copied!"
                      : "Copy Code"}
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CouponSlider;
