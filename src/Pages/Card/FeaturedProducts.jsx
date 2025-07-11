import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaThumbsUp, FaStar } from "react-icons/fa";

const FeaturedProducts = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ Fetch featured products
  const { data: featured = [], isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/featured");
      return res.data;
    },
  });

  // ✅ Upvote mutation
  const upvoteMutation = useMutation({
    mutationFn: ({ id, userEmail }) =>
      axiosSecure.patch(`/products/upvote/${id}`, { userEmail }),
    onSuccess: () => {
      toast.success("Voted successfully!");
      queryClient.invalidateQueries(["featuredProducts"]);
    },
    onError: () => {
      toast.error("Already voted or failed!");
    },
  });

  // ✅ Handle upvote button click
  const handleUpvote = (product) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (product.voters.includes(user.email)) {
      toast.error("You already voted!");
      return;
    }

    upvoteMutation.mutate({ id: product._id, userEmail: user.email });
  };

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-yellow-500">
        <FaStar /> Featured Products
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow bg-white"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover mb-2 rounded"
            />

            <Link
              to={`/product/${product._id}`}
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {product.name}
            </Link>

            <div className="mt-2 flex flex-wrap gap-1 text-sm">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 px-2 py-1 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => handleUpvote(product)}
              className="btn btn-sm mt-3 flex items-center gap-1"
              disabled={user?.email === product.ownerEmail}
            >
              <FaThumbsUp /> {product.upvotes}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
