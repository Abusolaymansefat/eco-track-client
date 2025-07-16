import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ReportedProducts = () => {
  const axiosSecure = useAxios();
  const [reported, setReported] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get("/reports").then((res) => {
      setReported(res.data);
    });
  }, [axiosSecure]);

  const handleDelete = async (productId) => {
    try {
      await axiosSecure.delete(`/products/${productId}`);
      toast.success("Product deleted successfully");
      setReported(reported.filter((r) => r.productId !== productId));
    } catch (err) {
      toast.error("Failed to delete product", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
       Reported Products ({reported.length})
      </h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Reporter Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reported.map((r, index) => (
            <tr key={r.productId}>
              <td>{index + 1}</td>
              <td>{r.productName}</td>
              <td>{r.reporterEmail}</td>
              <td className="space-x-2">
                <button
                  onClick={() => navigate(`/product/${r.productId}`)}
                  className="btn btn-sm btn-info"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(r.productId)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedProducts;
