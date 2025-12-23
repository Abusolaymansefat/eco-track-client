import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaThumbsUp, FaSearch } from "react-icons/fa";
import Loading from "../../DashboardLayout/DashboardHome/Loading";
import { motion } from "framer-motion";

const AllProducts = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 6;

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const {
    data = { products: [], total: 0 },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allProducts", page, searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products?page=${page}&limit=${limit}&search=${encodeURIComponent(
          searchTerm
        )}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const products = Array.isArray(data?.products) ? data.products : [];
  const totalPages = Math.max(1, Math.ceil((data?.total || 0) / limit));

  const upvoteMutation = useMutation({
    mutationFn: async (id) =>
      axiosSecure.patch(`/products/upvote/${id}`, {
        userEmail: user.email,
      }),
    onSuccess: () => {
      toast.success("Upvoted!");
      queryClient.invalidateQueries(["allProducts", page, searchTerm]);
    },
    onError: () => toast.error("You already voted."),
  });

  const handleUpvote = (product) => {
    if (!user) return navigate("/login");
    if (product.voters?.includes(user.email))
      return toast.error("Already voted!");
    upvoteMutation.mutate(product._id);
  };

  return (
    <section className="relative py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            text-4xl font-extrabold text-center mb-10
            bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600
            bg-clip-text text-transparent
          "
        >
          🛍️ All Products
        </motion.h2>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full pl-12 pr-4 py-3 rounded-full
              border bg-white
              focus:ring-2 focus:ring-indigo-400
            "
          />
        </div>

        {/* States */}
        {isLoading && (
          <div className="text-center py-10">
            <Loading />
          </div>
        )}
        {isError && (
          <p className="text-center text-red-500">
            {error.message || "Failed to load products"}
          </p>
        )}

        {/* Products */}
        {!isLoading && !isError && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {products.map((product, i) => {
              const alreadyVoted = product.voters?.includes(user?.email);
              const isOwner = user?.email === product.ownerEmail;
              const tagsArray = Array.isArray(product.tags)
                ? product.tags
                : product.tags?.split(",") || [];

              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="
                    rounded-3xl p-5
                    bg-white/70 backdrop-blur-xl
                    border border-white/30
                    shadow-[0_0_40px_rgba(0,0,0,0.12)]
                  "
                >
                  {/* Image */}
                  <div className="overflow-hidden rounded-2xl mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-44 w-full object-cover transition-transform duration-500 hover:scale-110"
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
                        className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Upvote */}
                  <button
                    onClick={() => handleUpvote(product)}
                    disabled={isOwner || alreadyVoted}
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
                    <FaThumbsUp /> {product.upvotes}
                  </button>

                  {(isOwner || alreadyVoted) && (
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
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center mt-16 gap-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-6 py-2 rounded-full bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages}
            className="px-6 py-2 rounded-full bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
