import React from "react";
import useAuth from "../../../hooks/UseAuth";

const MyProfile = () => {
  const { user } = useAuth();

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
      
    </div>
  );
};

export default MyProfile;
