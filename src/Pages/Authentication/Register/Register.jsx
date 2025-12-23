import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import SocialLogin from "../SocialLogin/SocialLogin";
import { imageUpload } from "../../../api/utils";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Register = () => {
  const { register: createUser, updateProfile } =
    useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null); // ✅ image preview

  const password = watch("password");

  const passwordStrength = () => {
    if (!password) return 0;
    if (password.length < 6) return 25;
    if (password.match(/[A-Z]/) && password.match(/[0-9]/)) return 100;
    if (password.length >= 8) return 75;
    return 50;
  };

  // ✅ image preview handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const imageURL = await imageUpload(data.photo[0]);
      await createUser(data.email, data.password);
      await updateProfile(data.name, imageURL);

      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          photoURL: imageURL,
          role: "user",
          isSubscribed: false,
        }),
      });

      toast.success("🎉 Registration successful");
      navigate("/");
    } catch (err) {
      toast.error("❌ " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-sky-100 px-4">
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
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
          Create Account ✨
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("name", { required: true })}
              placeholder="Full name"
              className="w-full pl-12 py-3 rounded-full border"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("email", { required: true })}
              placeholder="Email address"
              className="w-full pl-12 py-3 rounded-full border"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("password", { required: true, minLength: 6 })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3 rounded-full border"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Strength bar */}
          {password && (
            <div>
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-2 rounded transition-all"
                  style={{
                    width: `${passwordStrength()}%`,
                    backgroundColor:
                      passwordStrength() < 50
                        ? "#ef4444"
                        : passwordStrength() < 75
                        ? "#f59e0b"
                        : "#22c55e",
                  }}
                />
              </div>
              <p className="text-xs mt-1 text-gray-500">
                Password strength
              </p>
            </div>
          )}

          {/* Image Upload + Preview */}
          <div className="space-y-3">
            {preview && (
              <div className="flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-emerald-400 shadow"
                />
              </div>
            )}

            <div className="relative">
              <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("photo", { required: true })}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full pl-12 py-3 rounded-full border"
              />
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register("terms", { required: true })}
            />
            I agree to the{" "}
            <span className="text-emerald-600 underline">
              Terms & Privacy
            </span>
          </label>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            disabled={loading}
            type="submit"
            className="
              w-full py-3 rounded-full font-bold text-white
              bg-gradient-to-r from-emerald-600 to-teal-600
              disabled:opacity-50
            "
          >
            {loading ? "Creating account..." : "Register"}
          </motion.button>
        </form>

        <p className="text-center mt-5 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-emerald-600">
            Login
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

export default Register;