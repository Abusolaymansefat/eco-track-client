import { useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import useAuth from "../../../hooks/UseAuth";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCrown,
  FaEdit,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

/* ---------- Helper ---------- */
const calcProfileCompletion = ({ name, email, photo, subscribed }) => {
  let score = 0;
  if (name) score += 25;
  if (email) score += 25;
  if (photo) score += 25;
  if (subscribed) score += 25;
  return score;
};

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  /* ---------- Fetch User ---------- */
  const { data: userData = {}, refetch } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  const isSubscribed = userData?.isSubscribed;
  const expiryDate = userData?.subscriptionExpiry
    ? new Date(userData.subscriptionExpiry)
    : null;

  /* ---------- Countdown ---------- */
  const daysLeft = useMemo(() => {
    if (!expiryDate) return null;
    const diff = expiryDate - new Date();
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  }, [expiryDate]);

  /* ---------- Completion ---------- */
  const completion = calcProfileCompletion({
    name: user?.displayName,
    email: user?.email,
    photo: user?.photoURL,
    subscribed: isSubscribed,
  });

  /* ---------- Edit Profile ---------- */
  const handleSaveProfile = async () => {
    await axiosSecure.patch(`/users/profile/${user.email}`, {
      name,
      photoURL: photo,
    });
    setEditOpen(false);
    refetch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 relative">

        {/* ---------- Edit Button ---------- */}
        <button
          onClick={() => setEditOpen(true)}
          className="absolute top-4 right-4 text-indigo-600"
        >
          <FaEdit />
        </button>

        {/* ---------- Avatar ---------- */}
        <div className="relative w-28 h-28 mx-auto">
          <img
            src={user?.photoURL || "https://i.pravatar.cc/150"}
            alt="profile"
            className="w-full h-full rounded-full border-4 border-indigo-500"
          />
          {isSubscribed && (
            <span className="absolute -bottom-2 -right-2 bg-yellow-400 p-2 rounded-full">
              <FaCrown className="text-white" />
            </span>
          )}
        </div>

        <h2 className="text-2xl font-bold text-center mt-3">
          {user?.displayName}
        </h2>
        <p className="text-center text-sm text-gray-500">{user?.email}</p>

        {/* ---------- Completion Ring ---------- */}
        <div className="mt-6 flex justify-center">
          <div className="relative w-28 h-28">
            <svg className="w-full h-full rotate-[-90deg]">
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="#6366f1"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(completion / 100) * 302} 302`}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-bold">
              {completion}%
            </span>
          </div>
        </div>

        <p className="text-center text-sm mt-2 text-gray-600">
          Profile Completion
        </p>

        {/* ---------- Subscription ---------- */}
        <div
          className={`mt-6 p-4 rounded-2xl text-white ${
            isSubscribed
              ? "bg-gradient-to-r from-green-500 to-emerald-600"
              : "bg-gradient-to-r from-indigo-500 to-purple-600"
          }`}
        >
          {isSubscribed ? (
            <>
              <p className="font-semibold flex items-center gap-2">
                <FaCheckCircle /> Membership Active
              </p>
              {daysLeft !== null && (
                <p className="text-sm mt-1 flex items-center gap-1">
                  <FaClock /> {daysLeft} days remaining
                </p>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate("/dashboardLayout/payment")}
              className="w-full bg-white text-indigo-600 font-bold py-2 rounded-full"
            >
              Subscribe for $30
            </button>
          )}
        </div>

        {/* ---------- Activity Timeline ---------- */}
        <div className="mt-8">
          <h4 className="font-semibold mb-3">Recent Activity</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>🔐 Last Login: {userData?.lastLogin || "Today"}</li>
            <li>📦 Last Product Added: {userData?.lastProduct || "N/A"}</li>
          </ul>
        </div>
      </div>

      {/* ---------- Edit Modal ---------- */}
      <AnimatePresence>
        {editOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm"
            >
              <h3 className="font-bold mb-4">Edit Profile</h3>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full mb-3"
                placeholder="Name"
              />
              <input
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="input input-bordered w-full mb-4"
                placeholder="Photo URL"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="btn btn-primary flex-1"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditOpen(false)}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyProfile;
