import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import useAdmin from "../../../hooks/useAdmin";
import Loading from "../DashboardHome/Loading";
import AdminDashboard from "../DashboardHome/AdminDashboard";
import UserDashboard from "../DashboardHome/UserDashboard";
import Forbidden from "../../shared/Forbidden/Forbidden";

const DashboardHome = () => {
  const [role, roleLoading] = useAdmin();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!roleLoading && role === "Membership") {
      navigate("/dashboardLayout/membership");
    }
  }, [role, roleLoading, navigate]);

  if (roleLoading) {
    return <Loading />;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  }

  if (role === "user") {
    return <UserDashboard />;
  }

  
  return <Forbidden />;
};

export default DashboardHome;
