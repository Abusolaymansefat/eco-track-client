import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaFire, FaThumbsUp, FaTag } from "react-icons/fa";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { CircleLoader } from "react-spinners";
import { motion } from "framer-motion";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .get("/products")
      .then((res) => {
        const allProducts = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];
        const trending = allProducts
          .sort((a, b) => b.upvotes - a.upvotes)
          .slice(0, 8);
        setProducts(trending);
      })
      .catch(() => toast.error("Failed to load products"));
  }, [axiosSecure]);

  const handleUpvote = async (product) => {
    if (!user) return navigate("/login");

    if (product.voters?.includes(user.email)) {
      toast.error("You already voted!");
      return;
    }

    try {
      const res = await axiosSecure.patch(
        `/products/upvote/${product._id}`,
        { userEmail: user.email }
      );

      if (res.data.modifiedCount > 0) {
        setProducts((prev) =>
          prev.map((p) =>
            p._id === product._id
              ? {
                  ...p,
                  upvotes: p.upvotes + 1,
                  voters: [...(p.voters || []), user.email],
                }
              : p
          )
        );
        toast.success("Thanks for your vote!");
      }
    } catch {
      toast.error("Vote failed");
    }
  };

  return (
    <section className="relative py-6">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-400/30 blur-[140px]" />
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-purple-400/30 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2
            className="
              text-4xl font-extrabold mb-3
              flex items-center justify-center gap-3
              bg-gradient-to-r from-red-500 via-orange-500 to-pink-500
              bg-clip-text text-transparent
            "
          >
            <FaFire /> Trending Products
          </h2>
          <p className="max-w-2xl mx-auto opacity-70">
            Discover the most loved and upvoted tech products by our community.
          </p>
        </motion.div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="
                relative rounded-3xl p-5
                bg-white/70 backdrop-blur-xl
                border border-white/30
                shadow-[0_0_40px_rgba(0,0,0,0.12)]
                overflow-hidden
              "
            >
              {/* Card glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-400/30 blur-[120px]" />

              {/* Image */}
              <div className="overflow-hidden rounded-2xl mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-44 w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Title */}
              <Link
                to={`/products/${product._id}`}
                className="
                  text-xl font-bold block mb-2
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  bg-clip-text text-transparent
                  hover:underline
                "
              >
                {product.name}
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {(Array.isArray(product.tags)
                  ? product.tags
                  : product.tags?.split(",") || []
                ).map((tag, idx) => (
                  <span
                    key={idx}
                    className="
                      flex items-center gap-1
                      text-xs px-3 py-1 rounded-full
                      bg-blue-100 text-blue-800
                    "
                  >
                    <FaTag /> {tag.trim()}
                  </span>
                ))}
              </div>

              {/* Upvote */}
              <button
                onClick={() => handleUpvote(product)}
                disabled={
                  user?.email === product.ownerEmail ||
                  product.voters?.includes(user?.email)
                }
                className="
                  w-full mt-2 flex items-center justify-center gap-2
                  py-2 rounded-full font-semibold
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  text-white
                  hover:from-indigo-600 hover:to-purple-600
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition
                "
              >
                <FaThumbsUp />
                {product.upvotes}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Show All */}
        <div className="text-center mt-6">
          <Link to="/products">
            <button
              onClick={() => setLoadingAll(true)}
              className="
                px-10 py-3 rounded-full font-bold
                bg-gradient-to-r from-indigo-600 to-purple-600
                text-white
                hover:from-purple-600 hover:to-pink-600
                transition
              "
            >
              {loadingAll ? (
                <CircleLoader size={18} color="#fff" />
              ) : (
                "Show All Products"
              )}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
