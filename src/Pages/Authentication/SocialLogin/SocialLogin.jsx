import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaLock } from "react-icons/fa";

const SocialLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [previewUser, setPreviewUser] = useState(null); // avatar preview

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await googleLogin();
      const user = result.user;

      // 👉 show avatar preview instantly
      setPreviewUser({
        name: user.displayName,
        photo: user.photoURL,
      });

      const token = await user.getIdToken();
      localStorage.setItem("accessToken", token);

      const userForDB = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
        isSubscribed: false,
      };

      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userForDB),
      });

      if (res.status === 409) {
        toast.info("👋 Welcome back!");
      } else if (res.ok) {
        toast.success("✅ Google login successful");
      }

      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      toast.error("❌ Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 space-y-4">
      {/* Avatar Preview */}
      <AnimatePresence>
        {previewUser && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-2"
          >
            <img
              src={previewUser.photo}
              alt="User avatar"
              className="w-14 h-14 rounded-full border-2 border-emerald-400 shadow"
            />
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <FaCheckCircle className="text-green-500" />
              {previewUser.name}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Google Button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        disabled={loading}
        onClick={handleGoogleLogin}
        className="
          relative w-full py-3 rounded-full
          flex items-center justify-center gap-3
          bg-white
          border border-gray-200
          shadow-md hover:shadow-xl
          transition font-semibold
          disabled:opacity-60
        "
      >
        {/* Animated Gradient Ring */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 via-pink-400 to-emerald-400 opacity-0 hover:opacity-20 transition" />

        {loading ? (
          <span className="animate-pulse text-gray-600">
            Connecting to Google...
          </span>
        ) : (
          <>
            <FcGoogle className="text-2xl" />
            Continue with Google
          </>
        )}
      </motion.button>

      {/* Secure Text */}
      <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
        <FaLock /> Secure Google authentication
      </p>
    </div>
  );
};

export default SocialLogin;