import { Link, NavLink } from "react-router";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaHome,
  FaThList,
  FaSignInAlt,
  FaFacebook,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import home12Logo from "../../../assets/logo-1.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-t mt-10 px-4 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
        {/* Logo */}
        <div className="flex flex-col items-center sm:items-start">
          <NavLink to="/" className="btn btn-ghost normal-case text-xl p-0">
            <img
              src={home12Logo}
              alt="logo"
              className="h-12 w-auto object-contain p-1 rounded"
            />
          </NavLink>
          <p className="mt-2 text-sm">Your go-to app for awesome products.</p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold mb-2">Useful Links</h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <FaHome />
              <Link
                to="/"
                className="hover:text-blue-400 dark:hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <FaThList />
              <Link
                to="/products"
                className="hover:text-blue-400 dark:hover:text-blue-600 transition-colors"
              >
                Products
              </Link>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <FaSignInAlt />
              <Link
                to="/login"
                className="hover:text-blue-400 dark:hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="flex items-center justify-center sm:justify-start gap-2">
            <FaEnvelope />
            <a
              href="mailto:sefat01625@gmail.com"
              className="hover:text-blue-400 dark:hover:text-blue-600 transition-colors"
            >
              sefat01625@gmail.com
            </a>
          </p>
          <p className="flex items-center justify-center sm:justify-start gap-2 mt-1">
            <FaPhoneAlt />
            <a
              href="tel:+8801625192069"
              className="hover:text-blue-400 dark:hover:text-blue-600 transition-colors"
            >
              +880 1625192069
            </a>
          </p>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start mt-3 space-x-3 text-xl">
            <a
              href="https://www.facebook.com/abusolaymun.sefat/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            >
              <FaFacebook />
            </a>
            <a
              href="https://github.com/Abusolaymansefat"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 dark:bg-gray-300 dark:text-gray-900 dark:hover:bg-gray-400 transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/abu-solayman-sefat/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-600 transition-colors"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright at last */}
      <div className="max-w-7xl mx-auto mt-6 text-center text-sm">
        <p>© {new Date().getFullYear()} AppOrbit.</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
