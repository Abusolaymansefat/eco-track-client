import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ProductReviewQueue = () => {
  const axiosSecure = useAxios();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get("/products").then((res) => {
      // Sort: Pending > Accepted > Rejected
      const sorted = res.data.products.sort((a, b) => {
        const statusOrder = { Pending: 0, Accepted: 1, Rejected: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      });
      setProducts(sorted);
    });
  }, [axiosSecure]);

  const handleMakeFeatured = async (id) => {
    await axiosSecure.patch(`/products/featured/${id}`);
    toast.success("✅ Marked as Featured");
  };

  const handleStatusUpdate = async (id, newStatus) => {
    await axiosSecure.patch(`/products/status/${id}`, { status: newStatus });
    toast.success(`✅ Product ${newStatus}`);
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, status: newStatus } : p))
    );
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">🕵️ Product Review Queue</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.status || "Pending"}</td>
              <td className="space-x-2">
                <button
                  onClick={() => navigate(`/products/${p._id}`)} // products, plural
                  className="btn btn-sm btn-info"
                >
                  View
                </button>
                <button
                  onClick={() => handleMakeFeatured(p._id)}
                  className="btn btn-sm btn-warning"
                >
                  Make Featured
                </button>
                <button
                  onClick={() => handleStatusUpdate(p._id, "Accepted")}
                  className="btn btn-sm btn-success"
                  disabled={p.status === "Accepted"}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusUpdate(p._id, "Rejected")}
                  className="btn btn-sm btn-error"
                  disabled={p.status === "Rejected"}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductReviewQueue;
