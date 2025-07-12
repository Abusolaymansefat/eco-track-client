import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/UseAuth";
import useAxios from "../../../hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaThumbsUp } from "react-icons/fa";

const FeaturedProducts = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: featuredProducts = [], isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/featured");
      return res.data;
    },
  });

  const upvoteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/products/upvote/${id}`, {
        userEmail: user.email,
      });
    },
    onSuccess: () => {
      toast.success("Upvoted!");
      queryClient.invalidateQueries(["featuredProducts"]);
    },
    onError: () => toast.error("Already voted or failed!"),
  });

  const handleUpvote = (product) => {
    if (!user) return navigate("/login");
    if (product.voters?.includes(user.email)) {
      toast.error("You already voted!");
      return;
    }
    upvoteMutation.mutate(product._id);
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="my-10 px-4 max-w-7xl mx-auto bg-gradient-to-br py-10 rounded-lg shadow">
      <h2 className="text-3xl font-bold text-center mb-10">🔥 Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.slice(0, 6).map((product) => {
          const alreadyVoted = product.voters?.includes(user?.email);
          const isOwner = user?.email === product.ownerEmail;

          return (
            <div key={product._id} className="border p-4 rounded-lg shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />

              <Link to={`/products/${product._id}`}>
                <h3 className="text-xl font-semibold text-blue-600 hover:underline mt-2">
                  {product.name}
                </h3>
              </Link>

              <div className="flex flex-wrap gap-2 my-2">
                {product.tags?.map((tag, idx) => (
                  <span key={idx} className=" text-xs px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleUpvote(product)}
                disabled={isOwner || alreadyVoted}
                className={`btn btn-sm mt-3 flex items-center gap-2 ${
                  isOwner || alreadyVoted ? "btn-disabled" : "btn-primary"
                }`}
              >
                <FaThumbsUp /> {product.upvotes}
              </button>

              {(isOwner || alreadyVoted) && (
                <p className="text-xs text-red-500 mt-1">
                  {isOwner ? "You can't vote on your own product" : "You already voted"}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* 👉 Show All Products Button */}
      <div className="text-center mt-10">
        <Link to="/products">
          <button className="btn btn-outline btn-primary">Show All Products</button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
