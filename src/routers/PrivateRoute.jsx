
import React from "react";

import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/UseAuth";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
