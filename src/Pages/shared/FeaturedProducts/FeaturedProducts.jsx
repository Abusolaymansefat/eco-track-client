import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaThumbsUp } from "react-icons/fa";
import { CircleLoader } from "react-spinners";
import Loading from "../../DashboardLayout/DashboardHome/Loading";

const FeaturedProducts = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loadingAll, setLoadingAll] = useState(false); // ✅ loader state

  // Fetch featured products
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

  // Upvote mutation
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
      toast.error("Upvote failed or you already voted.");
    },
  });

  const handleUpvote = (product) => {
    if (!user) return navigate("/login");

    const alreadyVoted = product.voters?.includes(user.email);
    const isOwner = user.email === product.ownerEmail;

    if (alreadyVoted) {
      toast.error("You already voted!");
      return;
    }
    if (isOwner) {
      toast.error("You can't vote on your own product");
      return;
    }

    upvoteMutation.mutate(product._id);
  };

  if (isLoading)
    return (
      <p className="text-center py-10">
        <Loading />
      </p>
    );

  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        Error: {error.message || "Failed to load featured products"}
      </p>
    );

  return (
    <section className="my-10 px-4 max-w-7xl mx-auto bg-gradient-to-br py-10 rounded-lg shadow">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#1fc2eb]">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.slice(0, 6).map((product) => {
          const alreadyVoted = product.voters?.includes(user?.email);
          const isOwner = user?.email === product.ownerEmail;

          const tagsArray = Array.isArray(product.tags)
            ? product.tags
            : product.tags?.split(",") || [];

          return (
            <div
              key={product._id}
              className="p-4 rounded-lg shadow-md group relative"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded group-hover:scale-105 group-hover:brightness-95 transition-transform duration-300"
              />

              <Link to={`/products/${product._id}`}>
                <h3 className="text-lg sm:text-xl font-semibold text-[#64a6e7] dark:text-[#0d5eaf] hover:underline mt-2">
                  {product.name}
                </h3>
              </Link>

              <div className="flex flex-wrap gap-2 my-2">
                {tagsArray.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleUpvote(product)}
                disabled={isOwner || alreadyVoted || upvoteMutation.isLoading}
                className={`mt-3 flex items-center gap-2 ${
                  isOwner || alreadyVoted ? "text-[#2a8cf5]" : "text-[#087ad8]"
                }`}
              >
                <FaThumbsUp size={24} /> {product.upvotes || 0}
              </button>

              {(isOwner || alreadyVoted) && (
                <p className="text-xs text-red-500 opacity-0 group-hover:opacity-100 transition duration-300 absolute bottom-3 left-4 bg-white px-2 py-1 rounded shadow text-[11px]">
                  {isOwner
                    ? "You can't vote on your own product"
                    : "You already voted"}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-10">
        <Link to="/products">
          <button
            onClick={() => setLoadingAll(true)} 
            className="btn btn-outline bg-[#64a6e7] hover:bg-[#1e568d] flex items-center justify-center gap-2 mx-auto"
          >
            {loadingAll ? (
              <CircleLoader size={16} color="#1fc2eb" />
            ) : (
              "Show All Products"
            )}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
