// import { useState } from "react";
// import useAxios from "../../hooks/useAxios";
// import { useQuery } from "@tanstack/react-query";
// import { toast } from "react-toastify";

import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ManageCoupons = () => {
  const axiosSecure = useAxios();
  const [newCoupon, setNewCoupon] = useState("");

  const { data: coupons = [], refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  const handleAddCoupon = async () => {
    if (!newCoupon.trim()) return;
    await axiosSecure.post("/coupons", { code: newCoupon.toLowerCase(), discountPercent: 25 });
    toast.success("Coupon added!");
    setNewCoupon("");
    refetch();
  };

  const handleDelete = async (id) => {
    await axiosSecure.delete(`/coupons/${id}`);
    toast.success("Coupon deleted!");
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🎟️ Manage Coupons</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter new coupon code"
          value={newCoupon}
          onChange={(e) => setNewCoupon(e.target.value)}
          className="input input-bordered"
        />
        <button onClick={handleAddCoupon} className="btn btn-primary">
          Add Coupon
        </button>
      </div>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Coupon Code</th>
            <th>Discount (%)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((c) => (
            <tr key={c._id}>
              <td>{c.code}</td>
              <td>{c.discountPercent}%</td>
              <td>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="btn btn-xs btn-error"
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

export default ManageCoupons;
