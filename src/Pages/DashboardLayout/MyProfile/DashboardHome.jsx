import React from "react";
import AdminDashboard from "../DashboardHome/AdminDashboard";
import MembershipDashboard from "../DashboardHome/MembershipDashboard";
import UserDashboard from "../DashboardHome/UserDashboard";
import useAdmin from "../../../hooks/useAdmin";
import Forbidden from "../../shared/Forbidden/Forbidden";

const DashboardHome = () => {
  const {role, roleLoading} = useAdmin();

    if(roleLoading){
        return <Loading></Loading>
    }

    if(role === 'user'){
        return <UserDashboard></UserDashboard>
    }
    else if(role === 'Membership'){
        return <MembershipDashboard></MembershipDashboard>
    }
    else if(role === 'admin'){
        return <AdminDashboard></AdminDashboard>
    }
    else{
        return <Forbidden></Forbidden>
    }
  }


export default DashboardHome;
