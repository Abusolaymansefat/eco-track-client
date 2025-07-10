import { Link, NavLink } from "react-router";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaHome,
  FaThList,
  FaSignInAlt,
} from "react-icons/fa";
import home12Logo from "../../../assets/logo/loader.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t mt-10 px-4 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 items-start text-center md:text-left">
        {/* Logo */}
        <div>
          <NavLink to="/" className="btn btn-ghost normal-case text-xl p-0">
            <img
              src={home12Logo}
              alt="logo"
              className="h-12 w-auto object-contain bg-white p-1 rounded"
            />
          </NavLink>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold mb-2">Useful Links</h3>
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <FaHome />
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <FaThList />
              <Link to="/products" className="hover:text-blue-400">
                Products
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <FaSignInAlt />
              <Link to="/login" className="hover:text-blue-400">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="flex items-center gap-2">
            <FaEnvelope />
            <a
              className="hover:text-blue-400"
              href="mailto:sefat01625@gmail.com"
            >
              sefat01625@gmail.com
            </a>
          </p>
          <p className="flex items-center gap-2">
            <FaPhoneAlt />
            <a className="hover:text-blue-400" href="tel:+8801625192069">
              +880 1625192069
            </a>
          </p>
        </div>

        {/* Copyright */}
        <div className="text-sm md:text-right col-span-1 md:col-span-1 flex flex-col justify-between">
          <p>© {new Date().getFullYear()} AppOrbit.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
