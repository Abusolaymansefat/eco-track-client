import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaThumbsUp, FaFlag } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/UseAuth";
import { CircleLoader } from "react-spinners";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch Product
  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  // Fetch Reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  // Upvote Mutation
  const upvoteMutation = useMutation({
    mutationFn: () =>
      axiosSecure.patch(`/products/upvote/${id}`, { userEmail: user?.email }),
    onSuccess: () => {
      toast.success("Voted successfully!");
      queryClient.invalidateQueries(["product", id]);
    },
    onError: () => toast.error("Vote failed or already voted."),
  });

  // Report Mutation
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

  // Review Form
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
        <CircleLoader size={50} color="#492fde" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Product Details */}
      <div className="p-6 shadow rounded-lg bg-white dark:bg-gray-800 transition-colors">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 sm:h-80 object-cover rounded-lg"
        />
        <h2 className="text-2xl sm:text-3xl font-bold mt-4 text-gray-900 dark:text-white">
          {product.name}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{product.description}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {product.tags?.map((tag, i) => (
            <span
              key={i}
              className="badge badge-outline text-gray-800 dark:text-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {product.externalLink && (
          <a
            href={product.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline block mt-2"
          >
            🔗 Visit Website
          </a>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={handleUpvote}
            disabled={
              user?.email === product.ownerEmail ||
              product.voters?.includes(user?.email)
            }
            className="btn btn-sm btn-success flex items-center gap-2"
          >
            <FaThumbsUp /> {product.upvotes}
          </button>
          <button
            onClick={handleReport}
            className="btn btn-sm btn-error flex items-center gap-2"
          >
            <FaFlag /> Report
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="p-6 shadow rounded-lg bg-white dark:bg-gray-800 transition-colors space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Reviews
        </h3>
        {reviews.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">No reviews yet.</p>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev._id}
              className="border border-gray-300 dark:border-gray-600 p-3 rounded flex items-start gap-3"
            >
              <img
                src={rev.reviewerImage}
                alt={rev.reviewerName}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {rev.reviewerName}
                </p>
                <p className="text-gray-700 dark:text-gray-300">{rev.description}</p>
                <p className="text-sm text-yellow-500 mt-1">⭐ {rev.rating}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Post Review */}
      {user && (
        <div className="p-6 shadow rounded-lg bg-white dark:bg-gray-800 transition-colors">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Write a Review
          </h3>
          <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-4">
            <input
              value={user.displayName}
              readOnly
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              value={user.photoURL}
              readOnly
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <textarea
              {...register("description", { required: true })}
              placeholder="Write your review"
              className="textarea textarea-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="number"
              {...register("rating", { required: true, min: 1, max: 5 })}
              placeholder="Rating (1-5)"
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              className="btn btn-primary flex items-center justify-center gap-2"
              disabled={reviewMutation.isLoading}
            >
              {reviewMutation.isLoading ? (
                <CircleLoader size={20} color="#fff" />
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
