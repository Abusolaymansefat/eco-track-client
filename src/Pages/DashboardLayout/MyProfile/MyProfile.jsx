import { useNavigate } from "react-router";
import useAuth from "../../../hooks/UseAuth";

const MyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const subscriptionAmount = 20; // USD
  const isSubscribed = user?.isSubscribed || false;

  const handleSubscribe = () => {
    navigate("/dashboardLayout/payment"); // সাবস্ক্রিপশন পেজে রিডাইরেক্ট
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <img
        src={user?.photoURL}
        alt={user?.displayName}
        className="w-24 h-24 rounded-full mb-4"
      />
      <p>
        <strong>Name:</strong> {user?.displayName}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>

      {!isSubscribed ? (
        <button onClick={handleSubscribe} className="btn btn-primary mt-6">
          Subscribe for ${subscriptionAmount}
        </button>
      ) : (
        <p className="mt-6 text-green-600 font-semibold">
          Membership Status: <span className="text-xl">✅ Verified</span>
        </p>
      )}
    </div>
  );
};

export default MyProfile;
