import { Link, Outlet } from "react-router";
import Navbar from "../Pages/shared/Navbar/Navbar";
import {
  FaTachometerAlt,
  FaUser,
  FaPlusCircle,
  FaHistory,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800  p-5">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <nav className="flex flex-col space-y-4">
            <Link
              to="/dashboardLayout"
              className="hover:underline flex items-center gap-2"
            >
              <FaTachometerAlt /> Dashboard Home
            </Link>

            <Link
              to="/dashboardLayout/profile"
              className="hover:underline flex items-center gap-2"
            >
              <FaUser /> My Profile
            </Link>

            <Link
              to="/dashboardLayout/add-product"
              className="hover:underline flex items-center gap-2"
            >
              <FaPlusCircle /> Add Product
            </Link>

            <Link
              to="/dashboardLayout/paymentHistory"
              className="hover:underline flex items-center gap-2"
            >
              <FaHistory /> Payment History
            </Link>

            <Link
              to="/dashboardLayout/product-ReviewQueue"
              className="hover:underline flex items-center gap-2"
            >
              <FaCheckCircle /> Product Review Queue
            </Link>

            <Link
              to="/dashboardLayout/reported-Products"
              className="hover:underline flex items-center gap-2"
            >
              <FaExclamationCircle /> Reported Products
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 ">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
