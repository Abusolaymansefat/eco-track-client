import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaThumbsUp, FaFlag, FaTag } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import { CircleLoader } from "react-spinners";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  const upvoteMutation = useMutation({
    mutationFn: () =>
      axiosSecure.patch(`/products/upvote/${id}`, { userEmail: user?.email }),
    onSuccess: () => {
      toast.success("Voted successfully!");
      queryClient.invalidateQueries(["product", id]);
    },
    onError: () => toast.error("Vote failed or already voted."),
  });

  const reportMutation = useMutation({
    mutationFn: () =>
      axiosSecure.post(`/products/reports/${id}`, { userEmail: user?.email }),
    onSuccess: () => {
      toast.success("Product reported!");
      navigate("/dashboardLayout/reported-Products");
    },
    onError: () => toast.error("Failed to report product"),
  });

  const handleUpvote = () => {
    if (!user) return navigate("/login");
    if (product.voters?.includes(user.email)) {
      toast.error("Already voted!");
      return;
    }
    upvoteMutation.mutate();
  };

  const handleReport = () => {
    if (!user) return navigate("/login");
    reportMutation.mutate();
  };

  const { register, handleSubmit, reset } = useForm();
  const reviewMutation = useMutation({
    mutationFn: (reviewData) => axiosSecure.post("/reviews", reviewData),
    onSuccess: () => {
      toast.success("Review submitted!");
      reset();
      queryClient.invalidateQueries(["reviews", id]);
    },
    onError: () => toast.error("Failed to submit review"),
  });

  const onSubmitReview = (data) => {
    const review = {
      ...data,
      reviewerName: user?.displayName || "Anonymous",
      reviewerImage: user?.photoURL || "",
      productId: id,
      createdAt: new Date(),
    };
    reviewMutation.mutate(review);
  };

  if (productLoading)
    return (
      <div className="flex justify-center py-20">
        <CircleLoader size={50} color="#000" />
      </div>
    );

  return (
    <section className="relative py-6">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-400/30 blur-[140px]" />
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-purple-400/30 blur-[140px]" />

      <div className="relative max-w-4xl mx-auto px-4 space-y-6">
        {/* Product Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5, boxShadow: "0 0 60px rgba(0,0,255,0.2)" }}
          className="relative rounded-3xl p-5 bg-white/70 backdrop-blur-xl border border-white/30 shadow-[0_0_40px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-500"
        >
          {/* Card Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-400/30 blur-[120px]" />

          {/* Image */}
          <div className="overflow-hidden rounded-2xl mb-4 border-2 border-white/30">
            <img
              src={product.image}
              alt={product.name}
              className="h-64 w-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>

          {/* Title */}
          <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {product.name}
          </h2>
          <p className="text-gray-800 mb-4">{product.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full font-bold bg-blue-100 text-blue-800 flex items-center gap-1"
              >
                <FaTag /> {tag}
              </span>
            ))}
          </div>

          {/* External Link */}
          {product.externalLink && (
            <a
              href={product.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-4 text-white bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 rounded-full hover:from-purple-600 hover:to-pink-600 transition"
            >
              🔗 Visit Website
            </a>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUpvote}
              disabled={
                user?.email === product.ownerEmail ||
                product.voters?.includes(user?.email)
              }
              className="flex items-center gap-2 px-4 py-2 rounded-full font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <FaThumbsUp /> {product.upvotes}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReport}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-bold bg-gradient-to-r from-red-700 to-red-500 text-white"
            >
              <FaFlag /> Report
            </motion.button>
          </div>
        </motion.div>

        {/* Reviews */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold mb-4 text-black">Reviews</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-800">No reviews yet.</p>
          ) : (
            reviews.map((rev) => (
              <motion.div
                key={rev._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 0 40px rgba(0,0,255,0.2)" }}
                className="relative rounded-3xl p-4 bg-white/70 backdrop-blur-xl border border-white/30 shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-all duration-500"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={rev.reviewerImage}
                    alt={rev.reviewerName}
                    className="w-12 h-12 rounded-full border-2 border-white/30"
                  />
                  <div className="flex-1">
                    <p className="font-bold">{rev.reviewerName}</p>
                    <p className="text-gray-800">{rev.description}</p>
                    <p className="font-bold text-yellow-500 mt-1">⭐ {rev.rating}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Post Review */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, boxShadow: "0 0 40px rgba(0,0,255,0.2)" }}
            className="relative rounded-3xl p-5 bg-white/70 backdrop-blur-xl border border-white/30 shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-all duration-500"
          >
            <h3 className="text-2xl font-bold mb-4">Write a Review</h3>
            <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-4">
              <input
                value={user.displayName}
                readOnly
                className="input input-bordered w-full bg-gray-100 text-black font-bold"
              />
              <input
                value={user.photoURL}
                readOnly
                className="input input-bordered w-full bg-gray-100 text-black font-bold"
              />
              <textarea
                {...register("description", { required: true })}
                placeholder="Write your review"
                className="textarea textarea-bordered w-full bg-gray-100 text-black font-bold"
              />
              <input
                type="number"
                {...register("rating", { required: true, min: 1, max: 5 })}
                placeholder="Rating (1-5)"
                className="input input-bordered w-full bg-gray-100 text-black font-bold"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={reviewMutation.isLoading}
                className="
                  w-full mt-2 flex items-center justify-center gap-2
                  py-2 rounded-full font-semibold
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  text-white
                  hover:from-indigo-600 hover:to-purple-600
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition
                "
              >
                {reviewMutation.isLoading ? <CircleLoader size={20} color="#fff" /> : "Submit Review"}
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
