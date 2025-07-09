import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/shared/Navbar/Navbar";
import { div } from "framer-motion/client";

const AuthLayout = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div className="hero bg-base-200 ">
      
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AuthLayout;
