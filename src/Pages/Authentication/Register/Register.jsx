import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router"; 
import { toast } from "react-toastify";
import SocialLogin from "../SocialLogin/SocialLogin";
import { imageUpload } from "../../../api/utils";


const Register = () => {
  const { register: createUser, updateProfile } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Step 1: Upload image and get image URL
      const imageFile = data.photo[0];
      const imageURL = await imageUpload(imageFile);

      // Step 2: Create user
      const res = await createUser(data.email, data.password);

      // Step 3: Update user profile
      await updateProfile(res.user, {
        displayName: data.name,
        photoURL: imageURL,
      });

      toast.success("Registration successful");
      reset();
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

        <input
          {...register("photo", { required: true })}
          type="file"
          accept="image/*"
          className="w-full p-2 border"
        />
        {errors.photo && <p className="text-red-500">Photo is required</p>}

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
