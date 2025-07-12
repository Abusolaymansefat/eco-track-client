// import React, { useState } from "react";
// import useAuth from "../../../hooks/UseAuth";
// import { useNavigate } from "react-router-dom";

import { useNavigate } from "react-router";
import useAuth from "../../../hooks/UseAuth";

const MyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ধরুন সাবস্ক্রিপশনের দাম ফিক্সড
  const subscriptionAmount = 20; // $20

  // সাবস্ক্রিপশন করা আছে কিনা চেক (user.isSubscribed হতে পারে আপনার ডাটাবেস অনুযায়ী)
  const isSubscribed = user?.isSubscribed || false;

  // সাবস্ক্রিপশন বাটনে ক্লিক করলে পেমেন্ট পেজে পাঠাবেন
  const handleSubscribe = () => {
    navigate("/payment"); 
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <img
        src={user?.photoURL}
        alt={user?.displayName}
        className="w-24 h-24 rounded-full mb-4"
      />
      <p><strong>Name:</strong> {user?.displayName}</p>
      <p><strong>Email:</strong> {user?.email}</p>

      {!isSubscribed ? (
        <button
          onClick={handleSubscribe}
          className="btn btn-primary mt-6"
        >
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
