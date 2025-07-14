import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ReportedProducts = () => {
  const axiosSecure = useAxios();
  const [reported, setReported] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get("/reported").then((res) => {
      setReported(res.data); // should return joined data: product info + report info
    });
  }, [axiosSecure]);

  const handleDelete = async (id) => {
    await axiosSecure.delete(`/products/${id}`);
    toast.success("Product deleted successfully");
    setReported(reported.filter((r) => r._id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🚨 Reported Products</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Reporter Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reported.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.reporterEmail}</td>
              <td className="space-x-2">
                <button onClick={() => navigate(`/product/${r._id}`)} className="btn btn-sm btn-info">View</button>
                <button onClick={() => handleDelete(r._id)} className="btn btn-sm btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedProducts;
