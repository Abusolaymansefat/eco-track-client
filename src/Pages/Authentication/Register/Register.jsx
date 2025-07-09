import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../components/SocialLogin";
import { toast } from "react-toastify";

const Register = () => {
  const { register: createUser, updateProfile } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await createUser(data.email, data.password);
      await updateProfile(res.user, {
        displayName: data.name,
        photoURL: data.photo
      });
      toast.success("Registration successful");
      navigate("/");
    } catch (err) {
      toast.error("Registration failed: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name", { required: true })} placeholder="Name" className="w-full p-2 border" />
        {errors.name && <p className="text-red-500">Name is required</p>}

        <input {...register("email", { required: true })} placeholder="Email" className="w-full p-2 border" />
        {errors.email && <p className="text-red-500">Email is required</p>}

        <input {...register("password", { required: true, minLength: 6 })} type="password" placeholder="Password" className="w-full p-2 border" />
        {errors.password && <p className="text-red-500">Password must be 6 characters</p>}

        <input {...register("photo")} placeholder="Photo URL" className="w-full p-2 border" />

        <button className="bg-green-500 text-white py-2 px-4 rounded w-full">Register</button>
      </form>

      <p className="text-center mt-4">
        Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
      </p>

      <SocialLogin />
    </div>
  );
};

export default Register;
