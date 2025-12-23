import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../api/utils";
import { PulseLoader } from "react-spinners";
import useAuth from "../../hooks/UseAuth";
import { motion } from "framer-motion";
import { FaImage, FaTag, FaLink, FaInfoCircle } from "react-icons/fa";

const AddProduct = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [userProductCount, setUserProductCount] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [tagsPreview, setTagsPreview] = useState([]);

  const { register, handleSubmit, reset, watch } = useForm();

  /* ---------------- User Info ---------------- */
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/user/${user.email}`).then((res) => {
        setIsSubscribed(res.data.isSubscribed || false);
      });
    }
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/products?ownerEmail=${user.email}`)
        .then((res) => setUserProductCount(res.data.total || 0));
    }
  }, [user?.email, axiosSecure]);

  /* ---------------- Image Upload ---------------- */
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await imageUpload(file);
      setImageURL(url);
      toast.success("🖼️ Image uploaded successfully");
    } catch {
      toast.error("❌ Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- Tags Preview ---------------- */
  const tagsValue = watch("tags");
  useEffect(() => {
    if (tagsValue) {
      setTagsPreview(tagsValue.split(",").map((t) => t.trim()));
    }
  }, [tagsValue]);

  /* ---------------- Submit ---------------- */
  const onSubmit = async (data) => {
    if (!isSubscribed && userProductCount >= 1) {
      toast.error("Free users can add only 1 product. Upgrade to Pro 🚀");
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
      tags: tagsPreview,
      upvotes: 0,
      voters: [],
      ownerEmail: user?.email,
      timestamp: new Date(),
      status: "Pending",
      isFeatured: false,
    };

    setSubmitting(true);
    try {
      const res = await axiosSecure.post("/products", newProduct);
      if (res.data.insertedId) {
        toast.success("🚀 Product added successfully!");
        reset();
        setImageURL("");
        setUserProductCount((c) => c + 1);
      }
    } catch {
      toast.error("❌ Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-purple-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          w-full max-w-2xl
          bg-white/70 backdrop-blur-xl
          border border-white/30
          rounded-3xl p-8
          shadow-[0_0_60px_rgba(0,0,0,0.2)]
        "
      >
        <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          ➕ Add New Product
        </h2>

        <p className="text-center text-sm opacity-70 mb-6">
          Share your product with the community
        </p>

        {/* Limit Info */}
        <div className="mb-4 text-xs flex items-center justify-center gap-2 text-gray-600">
          <FaInfoCircle />
          {isSubscribed
            ? "Pro user: Unlimited products"
            : `Free user: ${userProductCount}/1 product used`}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name", { required: true })}
            placeholder="Product Name"
            className="input input-bordered w-full"
          />

          {/* Image Upload */}
          <label className="flex items-center gap-2 text-sm font-medium">
            <FaImage /> Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
            disabled={uploading || submitting}
          />

          {uploading && (
            <p className="text-sm text-blue-500">Uploading image...</p>
          )}

          {imageURL && (
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={imageURL}
              alt="Preview"
              className="w-40 rounded-lg shadow"
            />
          )}

          <textarea
            {...register("description", { required: true })}
            placeholder="Product Description"
            className="textarea textarea-bordered w-full"
          />

          <div className="relative">
            <FaLink className="absolute left-3 top-3 text-gray-400" />
            <input
              {...register("externalLink")}
              placeholder="External Link (optional)"
              className="input input-bordered w-full pl-9"
            />
          </div>

          <div className="relative">
            <FaTag className="absolute left-3 top-3 text-gray-400" />
            <input
              {...register("tags")}
              placeholder="Tags (comma separated)"
              className="input input-bordered w-full pl-9"
            />
          </div>

          {/* Tags Preview */}
          <div className="flex flex-wrap gap-2">
            {tagsPreview.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700"
              >
                #{tag}
              </span>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={uploading || submitting}
            className="
              w-full py-3 rounded-full font-bold text-white
              bg-gradient-to-r from-indigo-600 to-purple-600
              flex items-center justify-center gap-2
            "
          >
            {submitting && <PulseLoader size={8} color="#fff" />}
            {submitting ? "Submitting..." : "Add Product"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProduct;