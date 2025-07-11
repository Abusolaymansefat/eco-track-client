import React from "react";
import { FaPlus, FaUser } from "react-icons/fa";
import { Link } from "react-router";
import Navbar from "../../shared/Navbar/Navbar";

const DashboardHome = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div className="flex min-h-screen">
      {/* Sidebar */}
      
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/" className="flex items-center gap-2 hover:underline">
            <FaUser /> Dashboard Home
          </Link>
          <Link
            to="/dashboardLayout/profile"
            className="flex items-center gap-2 hover:underline"
          >
            <FaUser /> My Profile
          </Link>
          <Link
            to="/dashboardLayout/add-product"
            className="flex items-center gap-2 hover:underline"
          >
            <FaPlus /> Add Product
          </Link>
        </nav>
      </aside>
    </div>
    </div>
  );
};

export default DashboardHome;
