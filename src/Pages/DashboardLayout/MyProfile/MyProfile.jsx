import { useNavigate } from "react-router";
import useAuth from "../../../hooks/UseAuth";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

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
    <div className="p-6 max-w-md mx-auto shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
      <img
        src={user?.photoURL}
        alt={user?.displayName}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <p className="text-center">
        <strong>Name:</strong> {user?.displayName}
      </p>
      <p className="text-center">
        <strong>Email:</strong> {user?.email}
      </p>

      <button
        onClick={handleSubscribe}
        className="btn btn-primary mt-6"
        disabled={isSubscribed}
        title={isSubscribed ? "Already Subscribed" : ""}
      >
        {isSubscribed ? "✅ Subscribed" : `Subscribe for $20`}
      </button>

      {isSubscribed && (
        <p className="mt-4 text-green-600 font-semibold text-center">
          Membership Status: <span className="text-xl">✅ Verified</span>
        </p>
      )}
    </div>
  );
};

export default MyProfile;
