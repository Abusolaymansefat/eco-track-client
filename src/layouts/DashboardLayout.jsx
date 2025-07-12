import { Link, Outlet } from "react-router";
import Navbar from "../Pages/shared/Navbar/Navbar";
import { FaHistory } from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800  p-5">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <nav className="flex flex-col space-y-4">
            <Link to="/dashboardLayout" className="hover:underline">
              Dashboard Home
            </Link>
            <Link to="/dashboardLayout/profile" className="hover:underline">
              My Profile
            </Link>
            <Link to="/dashboardLayout/add-product" className="hover:underline">
              Add Product
            </Link>
            <Link to="/dashboardLayout/payment" className="hover:underline">
              Payment
            </Link>
            <Link
              to="/dashboardLayout/paymentHistory"
              className="hover:underline"
            >
              <FaHistory /> Payment History
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
