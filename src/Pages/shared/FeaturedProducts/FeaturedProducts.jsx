// import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/UseAuth";
import { useNavigate, useParams } from "react-router";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  // ✅ Fetch Product
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    }
  });

  // ✅ Upvote Mutation
  const upvoteMutation = useMutation({
    mutationFn: () =>
      axiosSecure.patch(`/products/upvote/${id}`, {
        userEmail: user.email,
      }),
    onSuccess: () => {
      toast.success("Voted successfully!");
      queryClient.invalidateQueries(["product", id]);
    },
    onError: () => {
      toast.error("Already voted or failed!");
    },
  });

  // ✅ Post Review Mutation
  const reviewMutation = useMutation({
    mutationFn: async () => {
      const review = {
        productId: id,
        reviewerName: user.displayName,
        reviewerImage: user.photoURL,
        description: reviewText,
        rating,
        timestamp: new Date(),
      };
      return await axiosSecure.post("/reviews", review);
    },
    onSuccess: () => {
      toast.success("Review submitted!");
      setReviewText("");
      setRating(0);
    },
    onError: () => toast.error("Review failed!"),
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (!product) return <p className="text-center">Product not found</p>;

  const handleUpvote = () => {
    if (!user) return navigate("/login");
    if (product.voters.includes(user.email)) {
      toast.error("You already voted!");
      return;
    }
    upvoteMutation.mutate();
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText || !rating) return toast.error("Fill all fields!");
    reviewMutation.mutate();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
      <p className="mb-4 text-gray-700">{product.description}</p>
      <div className="flex gap-2 flex-wrap mb-4">
        {product.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-200 text-sm px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="mb-2">Upvotes: {product.upvotes}</p>

      <div className="flex gap-2 mb-6">
        <button
          onClick={handleUpvote}
          className="btn btn-sm btn-primary"
          disabled={user?.email === product.ownerEmail}
        >
          Upvote
        </button>
        <button
          className="btn btn-sm btn-error"
          onClick={() => toast.info("Report submitted!")}
        >
          Report
        </button>
        {product.externalLink && (
          <a
            href={product.externalLink}
            className="btn btn-sm btn-secondary"
            target="_blank"
            rel="noreferrer"
          >
            Visit Website
          </a>
        )}
      </div>

      {/* ✅ Review Section */}
      <div className="bg-white p-4 rounded shadow mb-10">
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            type="text"
            value={user.photoURL}
            readOnly
            className="input input-bordered w-full"
          />
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review"
            className="textarea textarea-bordered w-full"
          />
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Rating (1-5)"
          />
          <button type="submit" className="btn btn-primary">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
