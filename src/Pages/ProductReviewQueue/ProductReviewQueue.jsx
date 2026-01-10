import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../DashboardLayout/DashboardHome/Loading";

const ProductReviewQueue = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  /* -------- Fetch Pending Products -------- */
  const { data: pendingProducts = [], isLoading } = useQuery({
    queryKey: ["pendingProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/review");
      return res.data;
    },
  });

  /* -------- Update Status -------- */
  const updateStatus = useMutation({
    mutationFn: async ({ ids, status, reason }) => {
      const res = await axiosSecure.patch(`/products/status`, {
        ids,
        status,
        reason,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Status updated successfully");
      setModalData(null);
      setRejectReason("");
      setSelectedProducts([]);
      queryClient.invalidateQueries(["pendingProducts"]);
    },
    onError: () => toast.error("Failed to update status"),
  });

  /* -------- Handlers -------- */
  const toggleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const openModal = (ids, status) => {
    setModalData({ ids, status });
  };

  const confirmAction = () => {
    if (modalData.status === "Rejected" && !rejectReason) {
      return toast.error("Reject reason is required");
    }

    updateStatus.mutate({
      ids: modalData.ids,
      status: modalData.status,
      reason: rejectReason,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-black">
        Product Review Queue
      </h2>

      {/* Bulk Approve */}
      {selectedProducts.length > 0 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => openModal(selectedProducts, "Approved")}
            className="px-6 py-2 bg-black text-white font-bold rounded-lg"
          >
            Approve Selected ({selectedProducts.length})
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loading />
        </div>
      ) : pendingProducts.length === 0 ? (
        <p className="text-center font-semibold text-gray-700">
          No pending products
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pendingProducts.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ y: -6 }}
              className="bg-white border-2 border-black rounded-2xl shadow-xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-44 object-cover border-b-2 border-black"
              />

              <div className="p-5">
                {/* Checkbox */}
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => toggleSelect(product._id)}
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {product.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-black text-white"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() =>
                      openModal([product._id], "Approved")
                    }
                    className="flex-1 py-2 bg-green-700 text-white font-bold rounded-lg"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      openModal([product._id], "Rejected")
                    }
                    className="flex-1 py-2 bg-red-700 text-white font-bold rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Confirm Modal */}
      <AnimatePresence>
        {modalData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-2xl font-bold mb-4 text-black">
                Confirm {modalData.status}
              </h3>

              {modalData.status === "Rejected" && (
                <textarea
                  placeholder="Enter reject reason..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full border-2 border-black rounded-lg p-2 mb-4"
                />
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setModalData(null)}
                  className="flex-1 py-2 border-2 border-black rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className="flex-1 py-2 bg-black text-white font-bold rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductReviewQueue;
