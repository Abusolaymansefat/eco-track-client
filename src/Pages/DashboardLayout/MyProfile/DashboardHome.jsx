import React from "react";
import Loading from "../DashboardHome/Loading";
import AdminDashboard from "../DashboardHome/AdminDashboard";
import MembershipDashboard from "../DashboardHome/MembershipDashboard";
import UserDashboard from "../DashboardHome/UserDashboard";
import useAdmin from "../../../hooks/useAdmin";
import Forbidden from "../../shared/Forbidden/Forbidden";
// import Loading from "../../shared/Loading/Loading";

const DashboardHome = () => {
  const [role, roleLoading] = useAdmin();

  console.log("ROLE CHECK:", role); // Debugging

  if (roleLoading) {
    return <Loading />;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  } else if (role === "user") {
    return <UserDashboard />;
  } else if (role === "Membership") {
    return <MembershipDashboard />;
  } else {
    return <Forbidden />;
  }
};

export default DashboardHome;
