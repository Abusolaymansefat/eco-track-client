import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaThumbsUp, FaStar, FaTag } from "react-icons/fa";
import { CircleLoader } from "react-spinners";
import Loading from "../../DashboardLayout/DashboardHome/Loading";
import { motion } from "framer-motion";

const FeaturedProducts = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loadingAll, setLoadingAll] = useState(false);

  /* Fetch featured products */
  const {
    data: featuredProducts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/featured");
      return res.data;
    },
  });

  /* Upvote mutation */
  const upvoteMutation = useMutation({
    mutationFn: async (productId) => {
      return axiosSecure.patch(`/products/upvote/${productId}`, {
        userEmail: user.email,
      });
    },
    onSuccess: () => {
      toast.success("Upvoted successfully!");
      queryClient.invalidateQueries(["featuredProducts"]);
    },
    onError: () => {
      toast.error("Upvote failed or already voted.");
    },
  });

  const handleUpvote = (product) => {
    if (!user) return navigate("/login");

    if (product.voters?.includes(user.email))
      return toast.error("You already voted!");
    if (user.email === product.ownerEmail)
      return toast.error("You can't vote on your own product");

    upvoteMutation.mutate(product._id);
  };

  if (isLoading)
    return (
      <div className="py-16 text-center">
        <Loading />
      </div>
    );

  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        {error.message || "Failed to load featured products"}
      </p>
    );

  return (
    <section className="relative py-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-indigo-400/30 blur-[140px]" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-purple-400/30 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            text-4xl font-extrabold text-center mb-14
            bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600
            bg-clip-text text-transparent
          "
        >
          ⭐ Featured Products
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredProducts.slice(0, 8).map((product, i) => {
            const alreadyVoted = product.voters?.includes(user?.email);
            const isOwner = user?.email === product.ownerEmail;

            const tagsArray = Array.isArray(product.tags)
              ? product.tags
              : product.tags?.split(",") || [];

            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="
                  relative rounded-3xl p-5
                  bg-white/70 backdrop-blur-xl
                  border border-white/30
                  shadow-[0_0_40px_rgba(0,0,0,0.12)]
                  overflow-hidden
                "
              >
                {/* Glow */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-400/30 blur-[120px]" />

                {/* Badge */}
                <span className="absolute top-4 left-4 z-10 flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-black/70 text-white">
                  <FaStar className="text-yellow-400" /> Featured
                </span>

                {/* Image */}
                <div className="overflow-hidden rounded-2xl mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Title */}
                <Link
                  to={`/products/${product._id}`}
                  className="
                    text-lg font-bold block mb-2
                    bg-gradient-to-r from-blue-600 to-indigo-600
                    bg-clip-text text-transparent
                    hover:underline
                  "
                >
                  {product.name}
                </Link>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tagsArray.map((tag, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800"
                    >
                      <FaTag /> {tag.trim()}
                    </span>
                  ))}
                </div>

                {/* Upvote */}
                <button
                  onClick={() => handleUpvote(product)}
                  disabled={alreadyVoted || isOwner || upvoteMutation.isLoading}
                  className="
                    w-full flex items-center justify-center gap-2
                    py-2 rounded-full font-semibold
                    bg-gradient-to-r from-indigo-600 to-purple-600
                    text-white
                    hover:from-purple-600 hover:to-pink-600
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition
                  "
                >
                  <FaThumbsUp />
                  {product.upvotes || 0}
                </button>

                {(alreadyVoted || isOwner) && (
                  <p className="text-[11px] text-red-500 text-center mt-2">
                    {isOwner
                      ? "You can't vote on your own product"
                      : "You already voted"}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Show All */}
        <div className="text-center mt-6">
          <Link to="/products">
            <button
              onClick={() => setLoadingAll(true)}
              className="
                px-10 py-3 rounded-full font-bold
                bg-gradient-to-r from-indigo-600 to-purple-600
                text-white
                hover:from-purple-600 hover:to-pink-600
                transition
              "
            >
              {loadingAll ? (
                <CircleLoader size={18} color="#fff" />
              ) : (
                "Show All Products"
              )}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
