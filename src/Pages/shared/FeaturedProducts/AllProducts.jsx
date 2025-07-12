import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/UseAuth";
import useAxios from "../../../hooks/useAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaThumbsUp } from "react-icons/fa";

const AllProducts = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 6;

  // Reset page when searchTerm changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const { data = { products: [], total: 0 }, isLoading } = useQuery({
    queryKey: ["allProducts", page, searchTerm],
    queryFn: async () => {
      // Call API with searchTerm as query param
      const res = await axiosSecure.get(
        `/products?page=${page}&limit=${limit}&search=${encodeURIComponent(searchTerm)}`
      );
      return res.data; // Expected { products, total }
    },
    keepPreviousData: true,
  });

  const products = data.products || [];
  const totalPages = Math.ceil(data.total / limit);

  const upvoteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/products/upvote/${id}`, {
        userEmail: user.email,
      });
    },
    onSuccess: () => {
      toast.success("Upvoted!");
      queryClient.invalidateQueries(["allProducts", page, searchTerm]);
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">🛍️ All Products</h2>

      {/* Search box */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-red-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const alreadyVoted = product.voters?.includes(user?.email);
            const isOwner = user?.email === product.ownerEmail;

            return (
              <div
                key={product._id}
                className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
                <Link to={`/products/${product._id}`}>
                  <h3 className="text-xl font-semibold text-blue-600 hover:underline mt-2">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex flex-wrap gap-2 my-2">
                  {product.tags?.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs rounded-full">
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
                    {isOwner
                      ? "You can't vote on your own product"
                      : "You already voted"}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-10 gap-4">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="btn btn-sm btn-outline"
        >
          Prev
        </button>
        <span className="mt-1 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPages}
          className="btn btn-sm btn-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
