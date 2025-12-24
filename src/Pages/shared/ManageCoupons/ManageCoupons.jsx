import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxios from "../../../hooks/useAxios";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const COUPONS_PER_PAGE = 10;

const ManageCoupons = () => {
  const axiosSecure = useAxios();
  const { register, handleSubmit, reset } = useForm();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // delete modal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  /* ---------------- Fetch Coupons ---------------- */
  const { data: coupons = [], refetch, isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  /* ---------------- Add Coupon ---------------- */
  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/coupons", data);
      if (res.data.insertedId) {
        toast.success("Coupon added successfully!");
        reset();
        refetch();
      }
    } catch {
      toast.error("Failed to add coupon");
    }
  };

  /* ---------------- Search ---------------- */
  const filteredCoupons = useMemo(() => {
    return coupons.filter((c) =>
      c.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [coupons, search]);

  /* ---------------- Pagination ---------------- */
  const totalPages = Math.ceil(filteredCoupons.length / COUPONS_PER_PAGE);

  const paginatedCoupons = filteredCoupons.slice(
    (page - 1) * COUPONS_PER_PAGE,
    page * COUPONS_PER_PAGE
  );

  /* ---------------- Delete ---------------- */
  const openDeleteModal = (coupon) => {
    setSelectedCoupon(coupon);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await axiosSecure.delete(
        `/coupons/${selectedCoupon._id}`
      );
      if (res.data.deletedCount > 0) {
        toast.success("Coupon deleted");
        refetch();
      }
    } catch {
      toast.error("Delete failed");
    } finally {
      setConfirmOpen(false);
      setSelectedCoupon(null);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-6"
    >
      {/* Title */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-extrabold mb-6"
      >
        🎟 Manage Coupons
      </motion.h2>

      {/* Add Coupon */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-base-200 p-6 rounded-2xl mb-8 shadow"
      >
        <input
          {...register("code", { required: true })}
          placeholder="Coupon Code"
          className="input input-bordered"
        />
        <input
          type="date"
          {...register("expiry", { required: true })}
          className="input input-bordered"
        />
        <input
          {...register("description", { required: true })}
          placeholder="Description"
          className="input input-bordered"
        />
        <input
          type="number"
          {...register("discount", { required: true })}
          placeholder="Discount %"
          className="input input-bordered"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="btn btn-primary md:col-span-2 flex items-center gap-2"
        >
          <FaPlus /> Add Coupon
        </motion.button>
      </motion.form>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search coupon code"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="input input-bordered w-full md:w-1/3 mb-4"
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Code</th>
              <th>Expiry</th>
              <th>Description</th>
              <th>Discount</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            )}

            {!isLoading && paginatedCoupons.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  No coupons found
                </td>
              </tr>
            )}

            <AnimatePresence>
              {paginatedCoupons.map((c) => (
                <motion.tr
                  key={c._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <td>{c.code}</td>
                  <td>
                    {new Date(c.expiry).toLocaleDateString()}
                  </td>
                  <td>{c.description}</td>
                  <td>{c.discount}%</td>
                  <td className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.85 }}
                      onClick={() => openDeleteModal(c)}
                      className="btn btn-xs btn-error"
                    >
                      <FaTrash />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="btn btn-circle btn-outline"
          >
            <FaChevronLeft />
          </button>

          <span className="font-bold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="btn btn-circle btn-outline"
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm text-center"
            >
              <h3 className="text-xl font-bold mb-3">
                Delete Coupon?
              </h3>
              <p className="mb-5 text-gray-600">
                Are you sure you want to delete{" "}
                <strong>{selectedCoupon?.code}</strong>?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-error flex-1"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageCoupons;
