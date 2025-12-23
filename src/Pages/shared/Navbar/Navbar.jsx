import { useContext, useEffect, useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import home12Logo from "../../../assets/logo-1.png";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const Navbar = () => {
  const { user, logout, role } = useContext(AuthContext); // role = "admin" | "user"
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [avatarOpen, setAvatarOpen] = useState(false);

  /* ---------------- Theme ---------------- */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  /* ---------------- Scroll Hide / Show ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  /* ---------------- Logout ---------------- */
  const handleLogOut = () => {
    logout()
      .then(() => toast.success("Logout successful"))
      .catch(() => toast.error("Logout failed"));
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setAvatarOpen(false);
  };

  /* ---------------- Menu Links ---------------- */
  const commonLinks = (
    <>
      <li>
        <NavLink to="/" onClick={handleLinkClick}>
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/products" onClick={handleLinkClick}>
          <FaBoxOpen /> Products
        </NavLink>
      </li>
    </>
  );

  const dashboardLink = (
    <li>
      <NavLink to="/dashboardLayout" onClick={handleLinkClick}>
        <FaTachometerAlt /> Dashboard
      </NavLink>
    </li>
  );

  /* ---------------- Animations ---------------- */
  const dropdownAnim = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.div
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          exit={{ y: -80 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black text-black dark:text-white shadow"
        >
          <div className="navbar container mx-auto px-4">
            {/* ---------------- Left ---------------- */}
            <div className="navbar-start">
              {/* Mobile Menu */}
              <div className="dropdown">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="btn btn-ghost lg:hidden"
                >
                  ☰
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.ul
                      variants={dropdownAnim}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="menu menu-sm dropdown-content bg-white dark:bg-gray-900 rounded-box mt-3 w-52 p-2 shadow"
                    >
                      {commonLinks}
                      {user && dashboardLink}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Logo */}
              <NavLink to="/" className="btn btn-ghost p-0">
                <img src={home12Logo} alt="logo" className="h-12" />
              </NavLink>
            </div>

            {/* ---------------- Center ---------------- */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                {commonLinks}
                {user && dashboardLink}
              </ul>
            </div>

            {/* ---------------- Right ---------------- */}
            <div className="navbar-end gap-3">
              {/* Theme */}
              <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
                {theme === "dark" ? <FaSun /> : <FaMoon />}
              </button>

              {/* User Section */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setAvatarOpen(!avatarOpen)}
                    className="flex items-center gap-2"
                  >
                    <img
                      src={user.photoURL || "https://i.ibb.co/2kRZbKQ/user.png"}
                      alt="user"
                      className="w-9 h-9 rounded-full border"
                    />
                  </button>

                  <AnimatePresence>
                    {avatarOpen && (
                      <motion.ul
                        variants={dropdownAnim}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-900 rounded-lg shadow p-2 menu"
                      >
                        <li className="px-2 py-1 font-semibold text-sm">
                          {user.displayName || user.email}
                        </li>

                        <li>
                          <NavLink to="/profile" onClick={handleLinkClick}>
                            <FaUser /> Profile
                          </NavLink>
                        </li>

                        {role === "admin" && (
                          <li>
                            <NavLink to="/dashboard/admin">
                              Admin Panel
                            </NavLink>
                          </li>
                        )}

                        <li>
                          <button onClick={handleLogOut}>
                            <FaSignOutAlt /> Logout
                          </button>
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <NavLink to="/register" className="btn btn-sm">
                    <FaUserPlus /> Register
                  </NavLink>
                  <NavLink to="/login" className="btn btn-sm">
                    <FaSignInAlt /> Login
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
