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
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../Pages/Payment/PaymentHistory";
import ReportedProducts from "../Pages/ReportedProducts/ReportedProducts";
import ProductReviewQueue from "../Pages/ProductReviewQueue/ProductReviewQueue";
import Statistics from "../Pages/shared/Statistics/Statistics";
import ManageUsers from "../Pages/shared/ManageUsers/ManageUsers";
import ManageCoupons from "../Pages/shared/ManageCoupons/ManageCoupons";
import AdminRoute from "../Pages/shared/AdminRoute/AdminRoute";
// import PaymentForm from "../Pages/Payment/PaymentForm";

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
    element: <PrivateRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "profile", element: <MyProfile /> },
          { path: "add-product", element: <AddProduct /> },
          {
            path: "payment",
            element: <Payment />,
          },

          {
            path: "paymentHistory",
            element: <PaymentHistory></PaymentHistory>,
          },
          {
            path: "reported-Products",
            element: <ReportedProducts></ReportedProducts>,
          },
          {
            path: "product-ReviewQueue",
            element: <ProductReviewQueue></ProductReviewQueue>,
          },
          {
            path: "statistics",
            element: (
              <AdminRoute>
                <Statistics />
              </AdminRoute>
            ),
          },
          {
            path: "manage-users",
            element: (
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            ),
          },
          {
            path: "manage-coupons",
            element: (
              <AdminRoute>
                <ManageCoupons />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);
