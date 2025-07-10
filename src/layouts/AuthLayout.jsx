import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/shared/Navbar/Navbar";
import Footer from "../Pages/shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div>
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default AuthLayout;
