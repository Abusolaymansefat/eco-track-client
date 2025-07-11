import React from "react";
import { Link, Outlet } from "react-router";
import { FaUser, FaPlus } from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-2 hover:underline">
            <FaUser /> Dashboard Home
          </Link>
          
          
          
          <Link to="/dashboardLayout/add-product" className="flex items-center gap-2 hover:underline">
            <FaPlus /> Add Product
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
