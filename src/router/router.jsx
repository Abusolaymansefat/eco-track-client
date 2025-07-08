import {
  createBrowserRouter,

} from "react-router"; 
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        }
    ]
  },
  {
    path: "/*",
    Component: ErrorPage
  },
]); 