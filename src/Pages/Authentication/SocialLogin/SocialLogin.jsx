import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      // ✅ Save Google user to MongoDB
      const userForDB = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
        isSubscribed: false,
      };

      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userForDB),
      });

      if (res.status === 409) {
        // user already exists
        toast.info("Welcome back!");
      } else if (res.ok) {
        toast.success("Google login successful");
      } else {
        throw new Error("MongoDB save failed");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google login failed: " + error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-2 bg-white border text-black font-semibold py-2 px-4 rounded w-full mt-4 shadow hover:shadow-md transition"
    >
      <FcGoogle className="text-2xl" />
      Continue with Google
    </button>
  );
};

export default SocialLogin;
