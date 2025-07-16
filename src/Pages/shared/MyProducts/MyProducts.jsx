import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyProducts = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user's products
  useEffect(() => {
    if (!user?.email) return;

    const fetchMyProducts = async () => {
      try {
        const res = await axiosSecure.get(`/products?ownerEmail=${user.email}`);
        setProducts(res.data.products || []);
      } catch (error) {
        toast.error("❌ Failed to load your products.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, [user, axiosSecure]);

  // Delete a product
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      await axiosSecure.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("🗑️ Product deleted successfully.");
    } catch (error) {
      toast.error("❌ Failed to delete product.");
    }
  };

  // Update product status (Approve/Reject)
  const handleStatusUpdate = async (id, status) => {
    try {
      await axiosSecure.patch(`/products/status/${id}`, { status });
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status } : p))
      );
      toast.success(`✅ Product ${status.toLowerCase()} successfully.`);
    } catch (error) {
      toast.error(`❌ Failed to ${status.toLowerCase()} product.`);
    }
  };

  if (loading)
    return <p className="text-center py-10">Loading your products...</p>;

  if (products.length === 0) {
    return (
      <p className="text-center py-10">You have no products posted yet.</p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Votes</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ _id, name, upvotes, status = "Pending" }, index) => (
            <tr key={_id}>
              <td>{index + 1}</td>
              <td>{name}</td>
              <td>{upvotes}</td>
              <td>{status}</td>
              <td className="space-x-2">
                <button
                  onClick={() =>
                    navigate(`/dashboardLayout/update-product/${_id}`)
                  }
                  className="btn btn-sm btn-warning"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(_id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
                {status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(_id, "Approved")}
                      className="btn btn-sm btn-success"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(_id, "Rejected")}
                      className="btn btn-sm btn-error"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyProducts;
