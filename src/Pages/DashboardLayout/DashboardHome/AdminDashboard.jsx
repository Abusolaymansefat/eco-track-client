import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxios from "../../../hooks/useAxios";
import Loading from "./Loading";

const COLORS = ["#4ade80", "#fbbf24", "#60a5fa", "#0e659e", "#3e28bb", "#f87171"];

const AdminDashboard = () => {
  const axiosSecure = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-statistics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/statistics");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center text-[#3e28bb] py-10"><Loading/></div>;
  }

  const pieData = [
    { name: "Accepted Products", value: data.acceptedProducts },
    { name: "Pending Products", value: data.pendingProducts },
    { name: "Total Reviews", value: data.totalReviews },
    { name: "Total Users", value: data.totalUsers },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-sky-600">Admin Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        <div className=" p-4 rounded shadow text-center">
          <h4 className="text-xl font-semibold text-green-700">Total Products</h4>
          <p className="text-2xl font-bold">{data.totalProducts || 0}</p>
        </div>
        <div className=" p-4 rounded shadow text-center">
          <h4 className="text-xl font-semibold text-blue-700">Accepted Products</h4>
          <p className="text-2xl font-bold">{data.acceptedProducts || 0}</p>
        </div>
        <div className=" p-4 rounded shadow text-center">
          <h4 className="text-xl font-semibold text-yellow-700">Pending Products</h4>
          <p className="text-2xl font-bold">{data.pendingProducts || 0}</p>
        </div>
        <div className=" p-4 rounded shadow text-center">
          <h4 className="text-xl font-semibold text-purple-700">Total Reviews</h4>
          <p className="text-2xl font-bold">{data.totalReviews || 0}</p>
        </div>
        <div className=" p-4 rounded shadow text-center">
          <h4 className="text-xl font-semibold text-indigo-700">Total Users</h4>
          <p className="text-2xl font-bold">{data.totalUsers || 0}</p>
        </div>
        <div className=" p-4 rounded shadow text-center">
          <h4 className="text-xl font-semibold text-pink-700">Total Reports</h4>
          <p className="text-2xl font-bold">{data.totalReports || 0}</p>
        </div>
        <div className=" p-4 rounded shadow text-center col-span-2 sm:col-span-1">
          <h4 className="text-xl font-semibold text-red-700">Total Revenue</h4>
          <p className="text-2xl font-bold">${data.totalRevenue || 0}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="card shadow p-4 ">
        <h3 className="text-xl font-semibold mb-4">Site Statistics Chart</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
