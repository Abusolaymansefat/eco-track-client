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
    axiosSecure.get("/products")
      .then(res => {
        const trending = res.data
          .sort((a, b) => b.upvotes - a.upvotes)
          .slice(0, 6); // Top 6 by votes
        setProducts(trending);
      })
      .catch(err => console.error(err));
  }, [axiosSecure]);

  const handleUpvote = async (product) => {
    if (!user) {
      return navigate("/login");
    }

    if (product.voters.includes(user.email)) {
      return toast.error("You have already upvoted!");
    }

    try {
      const updated = await axiosSecure.patch(`/products/upvote/${product._id}`, {
        email: user.email,
      });

      if (updated.data.modifiedCount > 0) {
        toast.success("Thanks for your vote!");
        const updatedProducts = products.map(p =>
          p._id === product._id
            ? { ...p, upvotes: p.upvotes + 1, voters: [...p.voters, user.email] }
            : p
        );
        setProducts(updatedProducts);
      }
    } catch (err) {
      toast.error("Vote failed", err);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaFire className="text-red-500" /> Trending Products
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <Link
              to={`/product/${product._id}`}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {product.name}
            </Link>
            <p className="mt-2 text-sm text-gray-700">
              {product.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-gray-200 text-xs px-2 py-1 rounded-full mr-1"
                >
                  #{tag}
                </span>
              ))}
            </p>

            <button
              className="btn btn-sm mt-3 flex items-center gap-1"
              onClick={() => handleUpvote(product)}
              disabled={user?.email === product.ownerEmail}
            >
              <FaThumbsUp />
              {product.upvotes}
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/products" className="btn btn-outline btn-primary">
          Show All Products
        </Link>
      </div>
    </section>
  );
};

export default TrendingProducts;
