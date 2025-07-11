import { useForm } from "react-hook-form";
import useAuth from "../../hooks/UseAuth";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";
import { imageUpload } from "../../api/utils";
import { toast } from "react-toastify";

const AddProduct = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const { register, handleSubmit, reset } = useForm();

  // state to hold uploaded image URL after imgbb upload
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  // handle image file input change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await imageUpload(file);
      setImageURL(url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!imageURL) {
      toast.error("Please upload an image first");
      return;
    }

    const newProduct = {
      name: data.name,
      image: imageURL, 
      description: data.description,
      externalLink: data.externalLink,
      tags: data.tags ? data.tags.split(",").map(t => t.trim()) : [],
      upvotes: 0,
      voters: [],
      ownerEmail: user?.email,
      timestamp: new Date(),
      status: "Pending",
      isFeatured: false,
    };

    try {
      const res = await axiosSecure.post("/products", newProduct);
      if (res.data.insertedId) {
        toast.success("✅ Product Added!");
        reset();
        setImageURL("");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4  shadow rounded mt-10">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input {...register("name", { required: true })} placeholder="Product Name" className="input input-bordered w-full" />

        {/* Image File input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input file-input-bordered w-full"
          disabled={uploading}
          required
        />

        {uploading && <p className="text-sm text-blue-500">Uploading image...</p>}
        {imageURL && <img src={imageURL} alt="Uploaded" className="w-32 mt-2" />}

        <textarea {...register("description", { required: true })} placeholder="Description" className="textarea textarea-bordered w-full" />

        <input {...register("externalLink")} placeholder="External Link (optional)" className="input input-bordered w-full" />

        <input {...register("tags")} placeholder="Tags (comma separated)" className="input input-bordered w-full" />

        <button type="submit" className="btn btn-primary w-full" disabled={uploading}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
