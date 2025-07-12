import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import PrivateRoute from "../routers/PrivateRoute";
import MyProfile from "../Pages/DashboardLayout/MyProfile/MyProfile";
import AddProduct from "../Pages/AddProduct/AddProduct";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../Pages/DashboardLayout/MyProfile/DashboardHome";
import ProductDetails from "../Pages/shared/FeaturedProducts/ProductDetails";
import AllProducts from "../Pages/shared/FeaturedProducts/AllProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboardLayout",
    element: <PrivateRoute />,  // PrivateRoute will protect nested routes
    children: [
      {
        element: <DashboardLayout />,  // Layout for all dashboard routes
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "profile", element: <MyProfile /> },
          { path: "add-product", element: <AddProduct /> },
        ],
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);
