import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../../DashboardLayout/DashboardHome/Loading";

const CouponSlider = () => {
  const axiosSecure = useAxios();

  const {
    data: coupons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data.filter((coupon) => new Date(coupon.expiry) >= new Date());
    },
    staleTime: 0,
  });

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  if (isLoading)
    return (
      <p className="text-center py-10">
        <Loading />
      </p>
    );
  if (isError)
    return (
      <p className="text-center py-10 text-red-600">Failed to load coupons.</p>
    );
  if (coupons.length === 0)
    return <p className="text-center py-10">No active coupons available.</p>;

  return (
    <div className="max-w-2xl mx-auto py-10 bg-gray-100 rounded-3xl px-4 transition-colors">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-[#492fde] dark:text-[#6131e6]">
        Discount Coupons
      </h2>
      <Slider {...settings}>
        {coupons.map((coupon) => (
          <div
            key={coupon._id}
            className="rounded-xl bg-gradient-to-r from-[#635097] to-[#645983] dark:from-[#675d81] dark:to-[#312946] shadow-lg gap-5 p-6 mx-3 text-center transition-transform transform hover:scale-105 h-64 sm:h-72 flex flex-col justify-center"
          >
            <h3 className="font-bold  text-3xl sm:text-5xl mb-2 uppercase text-[#572eb8] dark:text-[#cbb8ff]">
              {coupon.code}
            </h3>
            <p className="mb-1 text-gray-700 dark:text-gray-200">
              {coupon.description}
            </p>
            <p className="mb-1 text-green-700 dark:text-green-400 font-semibold text-lg sm:text-xl">
              {coupon.discount}% OFF
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-auto">
              Expires on: {new Date(coupon.expiry).toLocaleDateString()}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CouponSlider;
