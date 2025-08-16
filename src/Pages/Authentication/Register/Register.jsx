import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import SocialLogin from "../SocialLogin/SocialLogin";
import { imageUpload } from "../../../api/utils";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const Register = () => {
  const { register: createUser, updateProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // ১. ইউজার ফটো আপলোড
      const imageFile = data.photo[0];
      const imageURL = await imageUpload(imageFile);

      // ২. Firebase Authentication দিয়ে ইউজার তৈরি
      const res = await createUser(data.email, data.password);
      console.log("Firebase user created:", res);

      // ৩. প্রোফাইল আপডেট (নাম + ফটো)
      await updateProfile(data.name, imageURL);

      // ৪. MongoDB তে ইউজার সেভ করার জন্য POST API কল
      const userForDB = {
        name: data.name,
        email: data.email,
        photoURL: imageURL,
        role: "user",
        isSubscribed: false,
      };

      const response = await fetch("http://localhost:3000//users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userForDB),
      });

      if (!response.ok) {
        throw new Error("Failed to save user to database");
      }

      toast.success("Registration successful");
      reset();
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          placeholder="Name"
          className="w-full p-2 border"
        />
        {errors.name && <p className="text-red-500">Name is required</p>}

        <input
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full p-2 border"
        />
        {errors.email && <p className="text-red-500">Email is required</p>}

        <input
          {...register("password", { required: true, minLength: 6 })}
          type="password"
          placeholder="Password"
          className="w-full p-2 border"
        />
        {errors.password && (
          <p className="text-red-500">Password must be at least 6 characters</p>
        )}

        <input
          {...register("photo", { required: true })}
          type="file"
          accept="image/*"
          className="w-full p-2 border"
        />
        {errors.photo && <p className="text-red-500">Photo is required</p>}

        <button
          type="submit"
          className={`bg-green-500 text-white py-2 px-4 rounded w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
      </p>

      <SocialLogin />
    </div>
  );
};

export default Register;
