import { useContext } from "react";
import { NavLink } from "react-router";
import {
  FaMoon,
  FaSun,
  FaHome,
  FaUserPlus,
  FaSignInAlt,
  FaSignOutAlt,
  FaBoxOpen,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import home12Logo from "../../../assets/logo-1.png";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogOut = () => {
    logout()
      .then(() => {
        toast.success("Logout successful");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Logout failed");
      });
  };

  const loggedOutLinks = (
    <>
      <li>
        <NavLink to="/" className="flex items-center gap-2">
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/products" className="flex items-center gap-2">
          <FaBoxOpen /> Products
        </NavLink>
      </li>
    </>
  );

  const loggedInLinks = (
    <>
      <li>
        <NavLink to="/" className="flex items-center gap-2">
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/products" className="flex items-center gap-2">
          <FaBoxOpen /> Products
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboardLayout" className="flex items-center gap-2">
          <FaTachometerAlt /> Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" className="flex items-center gap-2">
          <FaUser /> Profile
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-black fixed top-0 left-0 w-full z-50 shadow transition-colors duration-300">
      <div className="navbar container mx-auto px-4">
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {user ? loggedInLinks : loggedOutLinks}
            </ul>
          </div>

          {/* Logo */}
          <NavLink to="/" className="btn btn-ghost normal-case text-xl p-0">
            <img
              src={home12Logo}
              alt="logo"
              className="h-12 w-auto object-contain p-1"
            />
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {user ? loggedInLinks : loggedOutLinks}
          </ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end space-x-2">
          {/* Theme Toggle */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={(e) =>
                document.documentElement.setAttribute(
                  "data-theme",
                  e.target.checked ? "dark" : "light"
                )
              }
            />
            <FaSun className="swap-on fill-current w-5 h-5" />
            <FaMoon className="swap-off fill-current w-5 h-5" />
          </label>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:inline font-medium">
                {user.displayName || user.email}
              </span>
              <button
                onClick={handleLogOut}
                className="btn btn-sm flex items-center gap-1"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink
                className="btn btn-sm flex items-center gap-1"
                to="/register"
              >
                <FaUserPlus /> Register
              </NavLink>
              <NavLink
                className="btn btn-sm flex items-center gap-1"
                to="/login"
              >
                <FaSignInAlt /> Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
