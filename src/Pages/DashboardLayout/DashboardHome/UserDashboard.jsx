import React from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { FaShoppingCart, FaMoneyBillWave, FaStar } from "react-icons/fa";

/* -------- Demo Data (API থাকলে replace করবে) -------- */
const orderData = [
  { month: "Jan", orders: 3 },
  { month: "Feb", orders: 6 },
  { month: "Mar", orders: 4 },
  { month: "Apr", orders: 8 },
  { month: "May", orders: 5 },
];

const spendData = [
  { name: "Products", value: 320 },
  { name: "Membership", value: 120 },
  { name: "Discount Saved", value: 80 },
];

const COLORS = ["#6366f1", "#22c55e", "#f59e0b"];

const UserDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* ---------- Title ---------- */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-center mb-10 text-indigo-600"
      >
        👤 User Dashboard
      </motion.h2>

      {/* ---------- Summary Cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {[
          {
            title: "Total Orders",
            value: 26,
            icon: <FaShoppingCart />,
            color: "from-indigo-500 to-blue-600",
          },
          {
            title: "Total Spend",
            value: "$520",
            icon: <FaMoneyBillWave />,
            color: "from-emerald-500 to-green-600",
          },
          {
            title: "Reviews Given",
            value: 14,
            icon: <FaStar />,
            color: "from-yellow-400 to-orange-500",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl p-6 text-white bg-gradient-to-br ${card.color}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="opacity-80">{card.title}</p>
                <h3 className="text-3xl font-bold">{card.value}</h3>
              </div>
              <div className="text-4xl opacity-80">{card.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ---------- Charts ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Orders Trend */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow p-6"
        >
          <h4 className="font-bold text-center mb-4">
            📈 Order Activity
          </h4>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Spending Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow p-6"
        >
          <h4 className="font-bold text-center mb-4">
            💰 Spending Breakdown
          </h4>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spendData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {spendData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
