import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Slider from "react-slick";

// Import slick-carousel CSS (ensure installed slick-carousel package)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const CouponSlider = () => {
  const axiosSecure = useAxios();

  const { data: coupons = [], isLoading, isError } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      // Only show coupons that are not expired
      return res.data.filter(coupon => new Date(coupon.expiry) >= new Date());
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
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
        settings: { slidesToShow: 1 }
      }
    ],
  };

  if (isLoading) return <p className="text-center py-10">Loading coupons...</p>;
  if (isError) return <p className="text-center py-10 text-red-600">Failed to load coupons.</p>;
  if (coupons.length === 0) return <p className="text-center py-10">No active coupons available.</p>;

  return (
    <div className="max-w-2xl mx-auto py-10 bg-[#90addf] rounded-4xl px-4">
      <h2 className="text-3xl font-bold mb-6 text-center"> Discount Coupons</h2>
      <Slider {...settings}>
        {coupons.map(coupon => (
          <div key={coupon._id} className=" rounded-lg shadow-md p-6 mx-3 text-center">
            <h3 className="font-bold text-[#572eb8] text-4xl mb-2">{coupon.code}</h3>
            <p className="mb-1 text-gray-700">{coupon.description}</p>
            <p className="mb-1 text-green-700 font-semibold">{coupon.discount}20% OFF</p>
            <p className="text-sm text-gray-500">Expires on: {new Date(coupon.expiry).toLocaleDateString()}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CouponSlider;