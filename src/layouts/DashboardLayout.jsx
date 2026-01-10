import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaHistory,
  FaPlusCircle,
  FaTachometerAlt,
  FaUser,
  FaBoxOpen,
  FaChartBar,
  FaUsers,
  FaTicketAlt,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaBell,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import home12Logo from "../assets/logo-1.png";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* -------- User Profile -------- */
  const { data: userData = {} } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  /* -------- Admin Check -------- */
  const { data: isAdmin } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data?.isAdmin;
    },
  });

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  const linkClass = ({ isActive }) =>
    `relative flex items-center gap-3 px-4 py-2 rounded-lg transition-all
     ${isActive
      ? "bg-white text-black font-semibold"
      : "text-gray-400 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 text-2xl text-black"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: sidebarOpen || window.innerWidth >= 1024 ? 0 : -260 }}
        transition={{ duration: 0.3 }}
        className="
          fixed top-0 left-0 z-40
          w-64 h-screen
          bg-black text-white
          p-5 flex flex-col
        "
      >
        {/* Logo */}
        <Link to="/" className="mb-6 flex justify-center">
          <img src={home12Logo} alt="logo" className="w-24 invert" />
        </Link>

        {/* User Card */}
        <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-white/10">
          <img
            src={user?.photoURL || "https://i.pravatar.cc/100"}
            alt="user"
            className="w-12 h-12 rounded-full border border-white"
          />
          <div className="flex-1">
            <p className="text-sm font-semibold">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs opacity-70">
              {isAdmin ? "Admin" : userData?.role || "Member"}
            </p>
          </div>

          <div className="relative">
            <FaBell />
            <span className="absolute -top-1 -right-1 bg-white text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 text-sm">
          <NavLink to="/dashboardLayout" className={linkClass}>
            <FaTachometerAlt /> Dashboard
          </NavLink>

          <NavLink to="/dashboardLayout/profile" className={linkClass}>
            <FaUser /> My Profile
          </NavLink>

          <NavLink to="/dashboardLayout/add-product" className={linkClass}>
            <FaPlusCircle /> Add Product
          </NavLink>

          <NavLink to="/dashboardLayout/paymentHistory" className={linkClass}>
            <FaHistory /> Payment History
          </NavLink>

          {userData?.role === "membership" && (
            <>
              <NavLink to="/dashboardLayout/my-Products" className={linkClass}>
                <FaBoxOpen /> My Products
              </NavLink>

              <NavLink
                to="/dashboardLayout/product-ReviewQueue"
                className={linkClass}
              >
                <FaCheckCircle /> Review Queue
              </NavLink>
            </>
          )}

          {isAdmin && (
            <>
              {/* <NavLink to="/dashboardLayout/statistics" className={linkClass}>
                <FaChartBar /> Statistics
              </NavLink> */}

              <NavLink
                to="/dashboardLayout/reported-Products"
                className={linkClass}
              >
                <FaExclamationCircle /> Reported Products
              </NavLink>

              <NavLink
                to="/dashboardLayout/manage-users"
                className={linkClass}
              >
                <FaUsers /> Manage Users
              </NavLink>

              <NavLink
                to="/dashboardLayout/manage-coupons"
                className={linkClass}
              >
                <FaTicketAlt /> Manage Coupons
              </NavLink>
            </>
          )}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            mt-6 flex items-center justify-center gap-2
            py-2 rounded-lg
            bg-white text-black font-semibold
            hover:bg-gray-200 transition
          "
        >
          <FaSignOutAlt /> Logout
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="min-h-screen pl-0 lg:pl-64 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
