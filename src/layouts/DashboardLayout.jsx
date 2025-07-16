import { Link, Outlet } from "react-router";
import Navbar from "../Pages/shared/Navbar/Navbar";
import Footer from "../Pages/shared/Footer/Footer";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
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
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

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

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 p-5 text-white">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <nav className="flex flex-col space-y-4">
            <Link to="/dashboardLayout" className="flex items-center gap-2">
              <FaTachometerAlt /> Dashboard Home
            </Link>
            <Link to="/dashboardLayout/profile" className="flex items-center gap-2">
              <FaUser /> My Profile
            </Link>
            <Link to="/dashboardLayout/add-product" className="flex items-center gap-2">
              <FaPlusCircle /> Add Product
            </Link>
            <Link to="/dashboardLayout/paymentHistory" className="flex items-center gap-2">
              <FaHistory /> Payment History
            </Link>

            {/* Membership role */}
            {userData?.role === "membership" && (
              <>
                <Link to="/dashboardLayout/my-Products" className="flex items-center gap-2">
                  <FaBoxOpen /> My Products
                </Link>
                <Link to="/dashboardLayout/product-ReviewQueue" className="flex items-center gap-2">
                  <FaCheckCircle /> Product Review Queue
                </Link>
                <Link to="/dashboardLayout/reported-Products" className="flex items-center gap-2">
                  <FaExclamationCircle /> Reported Products
                </Link>
              </>
            )}

            {/* Admin role */}
            {isAdmin && (
              <>
                <Link to="/dashboardLayout/statistics" className="flex items-center gap-2">
                  <FaChartBar /> Statistics
                </Link>
                <Link to="/dashboardLayout/reported-Products" className="flex items-center gap-2">
                  <FaExclamationCircle /> Reported Products
                </Link>
                <Link to="/dashboardLayout/manage-users" className="flex items-center gap-2">
                  <FaUsers /> Manage Users
                </Link>
                <Link to="/dashboardLayout/manage-coupons" className="flex items-center gap-2">
                  <FaTicketAlt /> Manage Coupons
                </Link>
              </>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
