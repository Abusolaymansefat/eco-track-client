import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import SocialLogin from "../SocialLogin/SocialLogin";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("🎉 Login successful");
      navigate("/");
    } catch (err) {
      toast.error("❌ Login failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-purple-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          w-full max-w-md
          bg-white/70 backdrop-blur-xl
          border border-white/30
          shadow-[0_0_60px_rgba(0,0,0,0.2)]
          rounded-3xl p-8
        "
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("email", { required: true })}
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-3 rounded-full border focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 ml-3">Email is required</p>
          )}

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("password", { required: true })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3 rounded-full border focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 ml-3">
              Password is required
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="
              w-full py-3 rounded-full font-bold text-white
              bg-gradient-to-r from-indigo-600 to-purple-600
              hover:from-purple-600 hover:to-pink-600
            "
          >
            Login
          </motion.button>
        </form>

        <p className="text-center mt-5 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="font-semibold text-indigo-600">
            Register
          </Link>
        </p>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <SocialLogin />
      </motion.div>
    </div>
  );
};

export default Login;
