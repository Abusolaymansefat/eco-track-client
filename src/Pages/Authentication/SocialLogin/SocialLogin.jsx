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
      className="flex items-center justify-center gap-2 bg-white border text-black font-semibold py-2 px-4 rounded w-full mt-4 shadow hover:shadow-md transition"
    >
      <FcGoogle className="text-2xl" />
      Continue with Google
    </button>
  );
};

export default SocialLogin;
