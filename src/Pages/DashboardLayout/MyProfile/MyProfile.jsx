import { useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useAuth from "../../../hooks/UseAuth";

const MyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  const { data: userData = {}, refetch } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  const isSubscribed = userData?.isSubscribed || false;

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);

  const handleSubscribe = () => {
    if (!isSubscribed) {
      navigate("/dashboardLayout/payment");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 w-full max-w-md mx-auto shadow rounded-xl bg-white text-gray-800 text-center">
        <h2 className="text-2xl font-bold mt-4">My Profile</h2>
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-blue-400"
        />

        <p>
          <strong>Name:</strong> {user?.displayName}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Role:</strong> {userData?.role || "user"}
        </p>

        <button
          onClick={handleSubscribe}
          className={`btn btn-primary mt-6 ${
            isSubscribed ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isSubscribed}
          title={isSubscribed ? "Already Subscribed" : ""}
        >
          {isSubscribed ? "✅ Subscribed" : `Subscribe for $30`}
        </button>

        {isSubscribed && (
          <>
            <p className="mt-4 text-green-600 font-semibold">
              Membership Status: <span className="text-green-700">✅ Verified</span>
            </p>
            {userData?.coupon && (
              <p className="text-gray-700 mt-1 text-sm">
                Coupon Used: <strong>{userData.coupon}</strong>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
