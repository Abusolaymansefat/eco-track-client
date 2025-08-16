import { useState } from "react";
import { Link, Outlet } from "react-router";
import Navbar from "../Pages/shared/Navbar/Navbar";
import Footer from "../Pages/shared/Footer/Footer";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
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
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  // 🔒 Fetch user profile
  const { data: userData = {} } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  // 🔐 Admin check
  const { data: isAdmin } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data?.isAdmin;
    },
  });

  const handleLinkClick = () => setSidebarOpen(false); // close sidebar on link click

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {/* Mobile toggle button */}
        <div className="lg:hidden absolute top-4 left-4 z-50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn btn-ghost text-xl text-gray-800 dark:text-white"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed lg:static z-40 w-64 bg-gray-800 text-white h-full p-5 transform lg:translate-x-0 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <nav className="flex flex-col space-y-4">
            <Link
              to="/dashboardLayout"
              onClick={handleLinkClick}
              className="flex items-center gap-2"
            >
              <FaTachometerAlt /> Dashboard Home
            </Link>
            <Link
              to="/dashboardLayout/profile"
              onClick={handleLinkClick}
              className="flex items-center gap-2"
            >
              <FaUser /> My Profile
            </Link>
            <Link
              to="/dashboardLayout/add-product"
              onClick={handleLinkClick}
              className="flex items-center gap-2"
            >
              <FaPlusCircle /> Add Product
            </Link>
            <Link
              to="/dashboardLayout/paymentHistory"
              onClick={handleLinkClick}
              className="flex items-center gap-2"
            >
              <FaHistory /> Payment History
            </Link>

            {/* Membership role */}
            {userData?.role === "membership" && (
              <>
                <Link
                  to="/dashboardLayout/my-Products"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2"
                >
                  <FaBoxOpen /> My Products
                </Link>
                <Link
                  to="/dashboardLayout/product-ReviewQueue"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2"
                >
                  <FaCheckCircle /> Product Review Queue
                </Link>
              </>
            )}

            {/* Admin role */}
            {isAdmin && (
              <>
                <Link
                  to="/dashboardLayout/statistics"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2"
                >
                  <FaChartBar /> Statistics
                </Link>
                <Link
                  to="/dashboardLayout/reported-Products"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2"
                >
                  <FaExclamationCircle /> Reported Products
                </Link>
                <Link
                  to="/dashboardLayout/manage-users"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2"
                >
                  <FaUsers /> Manage Users
                </Link>
                <Link
                  to="/dashboardLayout/manage-coupons"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2"
                >
                  <FaTicketAlt /> Manage Coupons
                </Link>
              </>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-64 transition-all duration-300">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
