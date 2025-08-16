import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaFire, FaThumbsUp } from "react-icons/fa";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { CircleLoader } from "react-spinners";

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
          .slice(0, 6);
        setProducts(trending);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load products");
      });
  }, [axiosSecure]);

  const handleUpvote = async (product) => {
    if (!user) return navigate("/login");

    if (product.voters?.includes(user.email)) {
      toast.error("You have already upvoted!");
      return;
    }

    try {
      const res = await axiosSecure.patch(`/products/upvote/${product._id}`, {
        userEmail: user.email,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Thanks for your vote!");
        const updatedProducts = products.map((p) =>
          p._id === product._id
            ? {
                ...p,
                upvotes: p.upvotes + 1,
                voters: [...(p.voters || []), user.email],
              }
            : p
        );
        setProducts(updatedProducts);
      }
    } catch (err) {
      console.error(err);
      toast.error("Vote failed");
    }
  };

  return (
    <section className="py-16 bg-gray-50  transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center justify-center gap-2 text-[#087ad8] ">
            <FaFire className="text-red-500" /> Trending Products
          </h2>
          <p className="text-gray-700 dark:text-gray-700">
            Discover the most upvoted tech products in our community!
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className=" rounded-lg p-4 shadow hover:shadow-lg transition bg-white"
            >
              <div className="overflow-hidden rounded">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 sm:h-48 w-full object-cover transform hover:scale-105 transition duration-300"
                />
              </div>

              <Link
                to={`/products/${product._id}`}
               className="text-lg sm:text-xl font-semibold text-[#64a6e7] dark:text-[#0d5eaf] hover:underline mt-2"
              >
                {product.name}
              </Link>

              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                {(Array.isArray(product.tags)
                  ? product.tags
                  : product.tags?.split(",") || []
                ).map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </p>

              <button
                className="btn btn-sm mt-3 flex items-center gap-1 text-[#2a8cf5] bg-[#315e8f] dark:bg-[#2a619c] hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 disabled:dark:bg-gray-600 transition-colors"
                onClick={() => handleUpvote(product)}
                disabled={
                  user?.email === product.ownerEmail ||
                  product.voters?.includes(user?.email)
                }
              >
                <FaThumbsUp size={24} /> {product.upvotes}
              </button>
            </div>
          ))}
        </div>

        {/* Show All Products Button */}
        <div className="text-center mt-10">
          <Link to="/products">
            <button
              onClick={() => setLoadingAll(true)}
              className="btn btn-outline  bg-[#64a6e7] hover:bg-[#1e568d] dark:bg-[#0559ad] text-white flex items-center justify-center gap-2 mx-auto"
            >
              {loadingAll ? (
                <CircleLoader size={16} color="#ffffff" />
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
