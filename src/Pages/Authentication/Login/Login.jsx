import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error("Login failed: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("email", { required: true })} placeholder="Email" className="w-full p-2 border" />
        {errors.email && <p className="text-red-500">Email is required</p>}

        <input {...register("password", { required: true })} type="password" placeholder="Password" className="w-full p-2 border" />
        {errors.password && <p className="text-red-500">Password is required</p>}

        <button className="bg-blue-500 text-white py-2 px-4 rounded w-full">Login</button>
      </form>

      <p className="text-center mt-4">
        Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
      </p>

      <SocialLogin />
    </div>
  );
};

export default Login;
