import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaThumbsUp, FaFlag } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/UseAuth";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get product details
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  // Get reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  // Upvote mutation
  const upvoteMutation = useMutation({
    mutationFn: () =>
      axiosSecure.patch(`/products/upvote/${id}`, {
        userEmail: user?.email,
      }),
    onSuccess: () => {
      toast.success("Voted successfully!");
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
    onError: () => {
      toast.error("Vote failed or already voted.");
    },
  });

  // Report mutation
  const reportMutation = useMutation({
    mutationFn: () => axiosSecure.patch(`/products/report/${id}`),
    onSuccess: () => toast.success("Product reported!"),
    onError: () => toast.error("Failed to report product"),
  });

  const handleUpvote = () => {
    if (!user) return navigate("/login");
    if (product.voters.includes(user.email)) {
      return toast.error("Already voted!");
    }
    upvoteMutation.mutate();
  };

  const handleReport = () => {
    reportMutation.mutate();
  };

  // Review Form
  const { register, handleSubmit, reset } = useForm();
  const reviewMutation = useMutation({
    mutationFn: (reviewData) => axiosSecure.post("/reviews", reviewData),
    onSuccess: () => {
      toast.success("Review submitted!");
      reset();
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
    },
  });

  const onSubmitReview = (data) => {
    const review = {
      ...data,
      reviewerName: user?.displayName || "Anonymous",
      reviewerImage: user?.photoURL || "",
      productId: id,
      date: new Date(),
    };
    reviewMutation.mutate(review);
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Product Info */}
      <div className="bg-white p-6 shadow rounded">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded"
        />
        <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {product.tags.map((tag, i) => (
            <span key={i} className="badge badge-outline">
              #{tag}
            </span>
          ))}
        </div>
        {product.externalLink && (
          <a
            href={product.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline block mt-2"
          >
            Visit Website
          </a>
        )}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleUpvote}
            disabled={user?.email === product.ownerEmail}
            className="btn btn-sm btn-success"
          >
            <FaThumbsUp /> {product.upvotes}
          </button>
          <button onClick={handleReport} className="btn btn-sm btn-error">
            <FaFlag /> Report
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white p-6 shadow rounded space-y-4">
        <h3 className="text-xl font-semibold">Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev._id}
              className="border p-3 rounded flex items-start gap-3"
            >
              <img
                src={rev.reviewerImage}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{rev.reviewerName}</p>
                <p>{rev.description}</p>
                <p className="text-sm text-yellow-600">⭐ {rev.rating}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Post Review Form */}
      {user && (
        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
          <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-4">
            <input
              value={user.displayName}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              value={user.photoURL}
              readOnly
              className="input input-bordered w-full"
            />
            <textarea
              {...register("description", { required: true })}
              placeholder="Write your review"
              className="textarea textarea-bordered w-full"
            />
            <input
              type="number"
              {...register("rating", { required: true, min: 1, max: 5 })}
              placeholder="Rating (1-5)"
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
