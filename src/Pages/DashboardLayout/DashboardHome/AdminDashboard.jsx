import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { motion } from "framer-motion";
import useAxios from "../../../hooks/useAxios";
import Loading from "./Loading";
import {
  FaBoxOpen,
  FaUsers,
  FaMoneyBillWave,
  FaFlag,
} from "react-icons/fa";

/* ---------- Colors ---------- */
const COLORS = ["#22c55e", "#facc15", "#60a5fa", "#a855f7", "#f87171"];

const ranges = [
  { label: "Last 7 Days", value: "7d" },
  { label: "Monthly", value: "month" },
  { label: "Yearly", value: "year" },
];

const AdminDashboard = () => {
  const axiosSecure = useAxios();
  const [activeMetric, setActiveMetric] = useState("revenue");
  const [range, setRange] = useState("7d");

  /* ---------- Main Stats ---------- */
  const { data, isLoading } = useQuery({
    queryKey: ["adminStatistics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/statistics");
      return res.data;
    },
  });

  /* ---------- Analytics Chart ---------- */
  const { data: chartData = [] } = useQuery({
    queryKey: ["analytics", activeMetric, range],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/analytics?metric=${activeMetric}&range=${range}`
      );
      return res.data;
    },
    enabled: !!data,
  });

  if (isLoading)
    return (
      <div className="py-20 text-center">
        <Loading />
      </div>
    );

  const {
    totalProducts,
    acceptedProducts,
    pendingProducts,
    totalUsers,
    totalReviews,
    totalReports,
    totalRevenue,
  } = data;

  /* ---------- Cards ---------- */
  const cards = [
    {
      key: "revenue",
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: <FaMoneyBillWave />,
      color: "from-emerald-500 to-teal-600",
    },
    {
      key: "products",
      title: "Total Products",
      value: totalProducts,
      icon: <FaBoxOpen />,
      color: "from-sky-500 to-indigo-600",
    },
    {
      key: "users",
      title: "Total Users",
      value: totalUsers,
      icon: <FaUsers />,
      color: "from-purple-500 to-pink-600",
    },
  ];

  /* ---------- Chart Data ---------- */
  const productCompare = [
    { name: "Approved", value: acceptedProducts },
    { name: "Pending", value: pendingProducts },
  ];

  const reportCompare = [
    { name: "Clean", value: totalProducts - totalReports },
    { name: "Reported", value: totalReports },
  ];

  const engagement = [
    { name: "Users", value: totalUsers },
    { name: "Reviews", value: totalReviews },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
        Admin Dashboard
      </h2>

      {/* ---------- KPI Cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {cards.map((c) => (
          <motion.div
            key={c.key}
            onClick={() => setActiveMetric(c.key)}
            whileHover={{ scale: 1.05 }}
            className={`cursor-pointer rounded-2xl p-6 text-white bg-gradient-to-br ${c.color}
              ${activeMetric === c.key && "ring-4 ring-white/40"}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-80">{c.title}</p>
                <h3 className="text-3xl font-bold">{c.value}</h3>
              </div>
              <div className="text-4xl opacity-80">{c.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ---------- Range Filter ---------- */}
      <div className="flex justify-center gap-3 mb-6">
        {ranges.map((r) => (
          <button
            key={r.value}
            onClick={() => setRange(r.value)}
            className={`px-4 py-1.5 rounded-full font-semibold
              ${range === r.value ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* ---------- Trend Line ---------- */}
      <div className="bg-white rounded-2xl shadow p-6 mb-16">
        <h4 className="font-bold text-center mb-4 capitalize">
          {activeMetric} trend ({range})
        </h4>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line dataKey="value" stroke="#6366f1" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ---------- Comparison Charts ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Status */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h4 className="font-bold text-center mb-4">Product Status</h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={productCompare}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Reports */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h4 className="font-bold text-center mb-4">Reports Overview</h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={reportCompare}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h4 className="font-bold text-center mb-4">User Engagement</h4>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={engagement} dataKey="value" outerRadius={90} label>
                {engagement.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
