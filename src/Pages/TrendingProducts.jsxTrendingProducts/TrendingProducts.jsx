import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { Link, useNavigate } from "react-router";
import { FaFire, FaThumbsUp } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../hooks/UseAuth";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .get("/products")
      .then((res) => {
        const allProducts = Array.isArray(res.data) ? res.data : res.data.products || [];
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
    <section className=" py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <FaFire className="text-red-500" /> Trending Products
          </h2>
          <p className="text-gray-600">
            Discover the most upvoted tech products in our community!
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition "
            >
              <div className="overflow-hidden rounded">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover transform hover:scale-105 transition duration-300"
                />
              </div>

              <Link
                to={`/products/${product._id}`}
                className="text-xl font-semibold text-blue-600 hover:underline block mt-3"
              >
                {product.name}
              </Link>

              <p className="mt-2 text-sm text-gray-700">
                {product.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-block  text-xs px-2 py-1 rounded-full mr-1"
                  >
                    {tag}
                  </span>
                ))}
              </p>

              <button
                className="btn btn-sm mt-3 flex items-center gap-1"
                onClick={() => handleUpvote(product)}
                disabled={user?.email === product.ownerEmail || product.voters?.includes(user?.email)}
              >
                <FaThumbsUp />
                {product.upvotes}
              </button>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link to="/products" className="btn btn-outline btn-primary">
            Show All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
