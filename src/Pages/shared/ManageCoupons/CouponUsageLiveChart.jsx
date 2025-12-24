import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxios from "../../../hooks/useAxios";

const CouponUsageLiveChart = () => {
  const axiosSecure = useAxios();

  /* -------- Live Data (auto refresh) -------- */
  const { data: chartData = [] } = useQuery({
    queryKey: ["couponUsageLive"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/coupon-analytics");
      return res.data;
    },
    refetchInterval: 5000, // 🔴 live update every 5 sec
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <h3 className="text-xl font-extrabold text-center mb-4">
        🎟 Coupon Usage (Live)
      </h3>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="index"
            label={{ value: "Usage Index", position: "insideBottom", offset: -5 }}
          />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="used"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-center text-sm mt-2 text-gray-500">
        🔄 Auto updating every 5 seconds
      </p>
    </motion.div>
  );
};

export default CouponUsageLiveChart;
