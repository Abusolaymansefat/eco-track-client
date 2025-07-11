import {
  createBrowserRouter,

} from "react-router"; 
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
// import DashboardLayout from "../Pages/DashboardLayout/DashboardLayout";
import PrivateRoute from "../routers/PrivateRoute";
import MyProfile from "../Pages/DashboardLayout/MyProfile/MyProfile";
import AddProduct from "../Pages/AddProduct/AddProduct";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../Pages/DashboardLayout/MyProfile/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      },
    ]
  },
  {
    path: "/dashboardLayout",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />
      },
      {
        path: "profile",
        element: <MyProfile />
      },
      {
        path: "add-product",
        element: <AddProduct />
      }
    ]
  },

  {
    path: "/*",
    Component: ErrorPage
  },
]); 