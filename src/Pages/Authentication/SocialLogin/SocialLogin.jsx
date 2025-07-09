import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Google login successful");
      navigate("/");
    } catch (error) {
      toast.error("Google login failed: " + error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-red-500 text-white py-2 px-4 rounded w-full mt-4"
    >
      Continue with Google
    </button>
  );
};

export default SocialLogin;
