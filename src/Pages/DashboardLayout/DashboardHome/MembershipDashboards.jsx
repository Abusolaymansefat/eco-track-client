import React, { useEffect, useState } from "react";
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
import {
  FaCrown,
  FaMoneyBillWave,
  FaGift,
  FaCalendarAlt,
  FaArrowUp,
} from "react-icons/fa";

/* ---------------- Dummy Data ---------------- */
const usageData = [
  { month: "Jan", usage: 2 },
  { month: "Feb", usage: 3 },
  { month: "Mar", usage: 5 },
  { month: "Apr", usage: 4 },
  { month: "May", usage: 7 },
];

const benefitData = [
  { name: "Saved Money", value: 180 },
  { name: "Extra Features", value: 120 },
  { name: "Rewards", value: 70 },
];

const COLORS = ["#22c55e", "#6366f1", "#f59e0b"];

/* ---------------- Component ---------------- */
const MembershipDashboards = () => {
  /* ---------- Expiry Countdown ---------- */
  const expiryDate = new Date("2025-12-31");
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const today = new Date();
    const diff = expiryDate - today;
    setDaysLeft(Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0));
  }, []);

  /* ---------- Live Savings Counter ---------- */
  const [savings, setSavings] = useState(0);
  const targetSavings = 180;

  useEffect(() => {
    let count = 0;
    const timer = setInterval(() => {
      count += 2;
      setSavings(count);
      if (count >= targetSavings) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* ---------- Title ---------- */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent"
      >
        👑 Membership Dashboard
      </motion.h2>

      {/* ---------- Top Cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-12">
        {/* Membership */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-2xl p-6 text-white bg-gradient-to-br from-yellow-400 to-orange-500"
        >
          <FaCrown className="text-4xl mb-2" />
          <p className="opacity-80">Membership</p>
          <h3 className="text-2xl font-bold">Premium</h3>
        </motion.div>

        {/* Live Savings */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-2xl p-6 text-white bg-gradient-to-br from-emerald-500 to-green-600"
        >
          <FaMoneyBillWave className="text-4xl mb-2" />
          <p className="opacity-80">Total Saved</p>
          <h3 className="text-2xl font-bold">${savings}</h3>
        </motion.div>

        {/* Rewards */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-2xl p-6 text-white bg-gradient-to-br from-indigo-500 to-purple-600"
        >
          <FaGift className="text-4xl mb-2" />
          <p className="opacity-80">Rewards</p>
          <h3 className="text-2xl font-bold">12</h3>
        </motion.div>

        {/* Expiry */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-2xl p-6 text-white bg-gradient-to-br from-pink-500 to-rose-600"
        >
          <FaCalendarAlt className="text-4xl mb-2" />
          <p className="opacity-80">Expires In</p>
          <h3 className="text-2xl font-bold">{daysLeft} days</h3>
        </motion.div>
      </div>

      {/* ---------- Renew Button ---------- */}
      <div className="flex justify-center mb-12">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 flex gap-2"
          onClick={() => alert("Demo: Renew Membership")}
        >
          <FaArrowUp /> Renew / Upgrade
        </motion.button>
      </div>

      {/* ---------- Charts ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Usage Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow p-6"
        >
          <h4 className="font-bold text-center mb-4">
            📈 Membership Usage
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Benefits Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow p-6"
        >
          <h4 className="font-bold text-center mb-4">
            🎁 Benefits Breakdown
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={benefitData} dataKey="value" outerRadius={100} label>
                {benefitData.map((_, i) => (
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

export default MembershipDashboards;
