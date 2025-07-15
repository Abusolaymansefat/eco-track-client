import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

const ProductReviewQueue = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  // Load pending products
  const { data: pendingProducts = [], isLoading } = useQuery({
    queryKey: ["pendingProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/review");
      return res.data;
    },
  });

  // Approve or Reject mutation
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/products/status/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Status updated!");
      queryClient.invalidateQueries(["pendingProducts"]);
    },
    onError: () => {
      toast.error("Failed to update status.");
    },
  });

  const handleUpdate = (id, status) => {
    updateStatus.mutate({ id, status });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        🧐 Product Review Queue
      </h2>

      {isLoading ? (
        <p className="text-center text-blue-500">Loading...</p>
      ) : pendingProducts.length === 0 ? (
        <p className="text-center text-green-600">No pending products ✅</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingProducts.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded shadow hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <div className="flex flex-wrap gap-1 mt-2">
                {product.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs rounded-full text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleUpdate(product._id, "Approved")}
                  className="btn btn-success btn-sm"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => handleUpdate(product._id, "Rejected")}
                  className="btn btn-error btn-sm"
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviewQueue;
