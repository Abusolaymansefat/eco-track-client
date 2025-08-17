import { useState } from "react";
import { Link, Outlet } from "react-router";
import useAxios from "../hooks/useAxios";
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
} from "react-icons/fa";
import useAuth from "../hooks/UseAuth";
import home12Logo from "../assets/logo-1.png";

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch user profile
  const { data: userData = {} } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  // Admin check
  const { data: isAdmin } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data?.isAdmin;
    },
  });

  const handleLinkClick = () => setSidebarOpen(false);

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {/* Mobile Sidebar Toggle */}
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
          className={`fixed lg:static z-40 w-64 bg-gray-800 text-white h-full p-5 transform lg:translate-x-0 transition-transform duration-300 shadow-lg ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Link to="/">
            {" "}
           
            <img src={home12Logo} alt="home" className="cursor-pointer w-28 mb-6" />
          </Link>
          <nav className="flex flex-col space-y-3">
            <Link
              to="/dashboardLayout"
              onClick={handleLinkClick}
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <FaTachometerAlt /> Dashboard Home
            </Link>
            <Link
              to="/dashboardLayout/profile"
              onClick={handleLinkClick}
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <FaUser /> My Profile
            </Link>
            <Link
              to="/dashboardLayout/add-product"
              onClick={handleLinkClick}
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <FaPlusCircle /> Add Product
            </Link>
            <Link
              to="/dashboardLayout/paymentHistory"
              onClick={handleLinkClick}
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <FaHistory /> Payment History
            </Link>

            {/* Membership role links */}
            {userData?.role === "membership" && (
              <>
                <Link
                  to="/dashboardLayout/my-Products"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 hover:text-blue-400"
                >
                  <FaBoxOpen /> My Products
                </Link>
                <Link
                  to="/dashboardLayout/product-ReviewQueue"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 hover:text-blue-400"
                >
                  <FaCheckCircle /> Product Review Queue
                </Link>
              </>
            )}

            {/* Admin role links */}
            {isAdmin && (
              <>
                <Link
                  to="/dashboardLayout/statistics"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 hover:text-blue-400"
                >
                  <FaChartBar /> Statistics
                </Link>
                <Link
                  to="/dashboardLayout/reported-Products"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 hover:text-blue-400"
                >
                  <FaExclamationCircle /> Reported Products
                </Link>
                <Link
                  to="/dashboardLayout/manage-users"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 hover:text-blue-400"
                >
                  <FaUsers /> Manage Users
                </Link>
                <Link
                  to="/dashboardLayout/manage-coupons"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 hover:text-blue-400"
                >
                  <FaTicketAlt /> Manage Coupons
                </Link>
              </>
            )}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 lg:ml-64 transition-all duration-300">
          <Outlet />
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default DashboardLayout;
