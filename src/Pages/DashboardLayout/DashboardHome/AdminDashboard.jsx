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

const COLORS = ["#4ade80", "#fbbf24", "#60a5fa", "#f87171"];

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
    return <div className="text-center py-10">Loading...</div>;
  }

  const pieData = [
    { name: "Accepted Products", value: data.acceptedProducts },
    { name: "Pending Products", value: data.pendingProducts },
    { name: "Total Reviews", value: data.totalReviews },
    { name: "Total Users", value: data.totalUsers },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>

      <div className="card shadow p-4">
        <h3 className="text-xl font-semibold mb-4">Site Statistics</h3>
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
