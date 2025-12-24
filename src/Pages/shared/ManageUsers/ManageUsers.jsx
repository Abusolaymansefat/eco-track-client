import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaUserShield,
} from "react-icons/fa";

const USERS_PER_PAGE = 10;
const ROLES = ["user", "admin", "membership"];

/* ---------------- Animation Variants ---------------- */
const buttonAnim = {
  hover: { scale: 1.08 },
  tap: { scale: 0.95 },
};

const rowAnim = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

const ManageUsers = () => {
  const axiosSecure = useAxios();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(1);

  // modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [nextRole, setNextRole] = useState("");

  /* ---------------- Query ---------------- */
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  /* ---------------- Search + Filter ---------------- */
  const filteredUsers = useMemo(() => {
    return users
      .filter((u) =>
        `${u.name || ""} ${u.email}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .filter((u) => {
        if (roleFilter === "all") return true;
        return (u.role || "user") === roleFilter;
      });
  }, [users, search, roleFilter]);

  /* ---------------- Pagination ---------------- */
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  /* ---------------- Role Change ---------------- */
  const openConfirm = (user, role) => {
    setSelectedUser(user);
    setNextRole(role);
    setConfirmOpen(true);
  };

  const handleConfirmRoleChange = async () => {
    try {
      if (nextRole === "admin") {
        await axiosSecure.patch(`/users/admin/${selectedUser.email}`);
      } else {
        await axiosSecure.patch(`/subscribe/${selectedUser.email}`, {
          role: nextRole,
          isSubscribed: nextRole === "membership",
        });
      }

      toast.success(`Role updated to "${nextRole}"`);
      refetch();
    } catch {
      toast.error("Failed to update role");
    } finally {
      setConfirmOpen(false);
      setSelectedUser(null);
      setNextRole("");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      {/* Title */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-extrabold mb-6 flex items-center gap-3"
      >
        <FaUserShield className="text-primary" />
        Manage Users
      </motion.h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          placeholder="🔍 Search name or email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="input input-bordered w-full md:w-1/2"
        />

        <motion.select
          whileHover={{ scale: 1.03 }}
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="select select-bordered w-full md:w-1/4"
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="membership">Membership</option>
        </motion.select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow-xl bg-base-100">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-bold">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Change Role</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {isLoading && (
                <tr>
                  <td colSpan={4} className="text-center py-8">
                    Loading users...
                  </td>
                </tr>
              )}

              {!isLoading && paginatedUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8">
                    No users found
                  </td>
                </tr>
              )}

              {paginatedUsers.map((u) => (
                <motion.tr
                  key={u._id}
                  variants={rowAnim}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                >
                  <td className="font-semibold">
                    {u.name || "No Name"}
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`badge badge-lg ${
                        u.role === "admin"
                          ? "badge-error"
                          : u.role === "membership"
                          ? "badge-success"
                          : "badge-info"
                      }`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>
                  <td className="text-center">
                    <motion.select
                      whileHover={{ scale: 1.05 }}
                      defaultValue={u.role || "user"}
                      onChange={(e) =>
                        openConfirm(u, e.target.value)
                      }
                      className="select select-sm select-bordered"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </motion.select>
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
          <motion.button
            variants={buttonAnim}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="btn btn-circle btn-outline"
          >
            <FaChevronLeft />
          </motion.button>

          <span className="font-bold">
            Page {page} of {totalPages}
          </span>

          <motion.button
            variants={buttonAnim}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="btn btn-circle btn-outline"
          >
            <FaChevronRight />
          </motion.button>
        </div>
      )}

      {/* Confirm Modal */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-xl"
            >
              <h3 className="text-xl font-bold mb-3">
                Confirm Role Change
              </h3>
              <p className="mb-5 text-gray-600">
                Change role of <br />
                <strong>{selectedUser?.email}</strong> to{" "}
                <strong>{nextRole}</strong>?
              </p>

              <div className="flex gap-3">
                <motion.button
                  variants={buttonAnim}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setConfirmOpen(false)}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </motion.button>

                <motion.button
                  variants={buttonAnim}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleConfirmRoleChange}
                  className="btn btn-primary flex-1"
                >
                  Confirm
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageUsers;
