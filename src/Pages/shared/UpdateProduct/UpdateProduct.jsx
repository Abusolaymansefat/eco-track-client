import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get(`/products/${id}`)
      .then(res => {
        const product = res.data;
       
        const { _id, ...rest } = product;
        reset(rest);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load product data.");
        setLoading(false);
      });
  }, [id, axiosSecure, reset]);

  const onSubmit = async (data) => {
    try {
      
      const { _id, ...updateData } = data;
      await axiosSecure.patch(`/products/${id}`, updateData);
      toast.success("✅ Product updated successfully!");
      navigate("/dashboardLayout/my-products");
    } catch (err) {
      toast.error("Failed to update product.", err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading product data...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4"> Update Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          className="input input-bordered w-full"
          placeholder="Product Name"
        />
        <textarea
          {...register("description")}
          className="textarea textarea-bordered w-full"
          placeholder="Description"
        />
        <input
          {...register("image")}
          className="input input-bordered w-full"
          placeholder="Image URL"
        />
        <input
          {...register("externalLink")}
          className="input input-bordered w-full"
          placeholder="External Link (optional)"
        />
        <input
          {...register("tags")}
          className="input input-bordered w-full"
          placeholder="Tags (comma separated)"
        />
        <button type="submit" className="btn btn-primary w-full">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
