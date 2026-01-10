import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../api/utils";
import { PulseLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import { FaImage, FaTag, FaLink, FaInfoCircle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

/* ---------------- Animation Variants ---------------- */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

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
      setTagsPreview(tagsValue.split(",").map((t) => t.trim()).filter(Boolean));
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
        setTagsPreview([]);
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white/70 backdrop-blur-xl border rounded-3xl p-8 shadow-2xl"
      >
        <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          ➕ Add New Product
        </h2>

        {/* Limit Info */}
        <AnimatePresence>
          {!isSubscribed && userProductCount >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-sm mb-4 text-red-600 font-medium"
            >
              ⚠️ Free limit reached — Upgrade to add more products
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          variants={container}
          initial="hidden"
          animate="show"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <motion.input
            variants={item}
            {...register("name", { required: true })}
            placeholder="Product Name"
            className="input input-bordered w-full"
          />

          <motion.div variants={item}>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <FaImage /> Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
              disabled={uploading || submitting}
            />
          </motion.div>

          {imageURL && (
            <motion.img
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              whileHover={{ scale: 1.05 }}
              src={imageURL}
              className="w-40 rounded-xl shadow-lg border"
            />
          )}

          <motion.textarea
            variants={item}
            {...register("description", { required: true })}
            placeholder="Product Description"
            className="textarea textarea-bordered w-full"
          />

          <motion.div variants={item} className="relative">
            <FaLink className="absolute left-3 top-3 text-gray-400" />
            <input
              {...register("externalLink")}
              placeholder="External Link"
              className="input input-bordered w-full pl-9"
            />
          </motion.div>

          <motion.div variants={item} className="relative">
            <FaTag className="absolute left-3 top-3 text-gray-400" />
            <input
              {...register("tags")}
              placeholder="Tags (comma separated)"
              className="input input-bordered w-full pl-9"
            />
          </motion.div>

          {/* Tags Preview */}
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {tagsPreview.map((tag, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0 }}
                  className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700"
                >
                  #{tag}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundPosition: "200% center",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={uploading || submitting}
            className="
              w-full py-3 rounded-full font-bold text-white
              bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600
              bg-[length:200%_200%]
              transition-all duration-500
              flex items-center justify-center gap-2
            "
          >
            {submitting && <PulseLoader size={8} color="#fff" />}
            {submitting ? "Submitting..." : "Add Product"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AddProduct;
