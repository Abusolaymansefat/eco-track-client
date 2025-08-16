// import { useForm } from "react-hook-form";
// import useAxios from "../../hooks/useAxios";
// import { useEffect, useState } from "react";
// import { imageUpload } from "../../api/utils";
// import { toast } from "react-toastify";
// import useAuth from "../../hooks/useAuth";

import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../api/utils";

const AddProduct = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [userProductCount, setUserProductCount] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/user/${user.email}`)
        .then((res) => setIsSubscribed(res.data.isSubscribed || false))
        .catch(() => setIsSubscribed(false));
    }
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/products?ownerEmail=${user.email}`)
        .then((res) => setUserProductCount(res.data.total || 0))
        .catch(() => {
          toast.error("Failed to load your product data");
        });
    }
  }, [user?.email, axiosSecure]);

  const { register, handleSubmit, reset } = useForm();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await imageUpload(file);
      setImageURL(url);
      toast.success("✅ Image uploaded");
    } catch (err) {
      toast.error("❌ Image upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
   
    if (!isSubscribed && userProductCount >= 1) {
      toast.error(
        "Free users can only add one product. Please subscribe for more."
      );
      return;
    }

    if (!imageURL) {
      toast.error("Please upload an image first");
      return;
    }

    const newProduct = {
      name: data.name,
      image: imageURL,
      description: data.description,
      externalLink: data.externalLink,
      tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
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
        setUserProductCount((count) => count + 1); 
      }
    } catch (err) {
      toast.error("❌ Failed to add product", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mt-10 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        ➕ Add New Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          placeholder="Product Name"
          className="input input-bordered w-full"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input file-input-bordered w-full"
          disabled={uploading}
          required
        />

        {uploading && (
          <p className="text-sm text-blue-500">Uploading image...</p>
        )}

        {imageURL && (
          <img src={imageURL} alt="Uploaded" className="w-32 mt-2" />
        )}

        <textarea
          {...register("description", { required: true })}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
        />

        <input
          {...register("externalLink")}
          placeholder="External Link (optional)"
          className="input input-bordered w-full"
        />

        <input
          {...register("tags")}
          placeholder="Tags (comma separated)"
          className="input input-bordered w-full"
        />

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={uploading}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
