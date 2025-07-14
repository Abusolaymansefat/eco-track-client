import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";

const ManageCoupons = () => {
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  // Fetch coupons list
  const { data: coupons = [], refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  // Add coupon handler
  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/coupons", data);
      if (res.data.insertedId) {
        toast.success("Coupon added successfully!");
        reset();
        refetch();       // Refetch coupon list locally
        navigate("/");   // Navigate to homepage (CouponSlider should be there)
      }
    } catch (error) {
      toast.error("Failed to add coupon: " + error.message);
    }
  };

  // Delete coupon handler
  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/coupons/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Coupon deleted successfully!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete coupon: " + error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Coupons</h2>

      {/* Add Coupon Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-base-200 p-6 rounded-md"
      >
        <input
          type="text"
          placeholder="Coupon Code"
          {...register("code", { required: true })}
          className="input input-bordered w-full"
        />
        <input
          type="date"
          placeholder="Expiry Date"
          {...register("expiry", { required: true })}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Description"
          {...register("description", { required: true })}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          placeholder="Discount %"
          {...register("discount", { required: true, min: 1, max: 100 })}
          className="input input-bordered w-full"
        />
        <button
          type="submit"
          className="btn btn-primary col-span-1 md:col-span-2"
        >
          Add Coupon
        </button>
      </form>

      {/* Coupons Table */}
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Code</th>
              <th>Expiry</th>
              <th>Description</th>
              <th>Discount (%)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No coupons found.
                </td>
              </tr>
            )}
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td>{coupon.code}</td>
                <td>{new Date(coupon.expiry).toLocaleDateString()}</td>
                <td>{coupon.description}</td>
                <td>{coupon.discount}</td>
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(coupon._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupons;
