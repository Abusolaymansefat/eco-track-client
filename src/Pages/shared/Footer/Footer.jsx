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
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaStripe,
  FaLock,
  FaInfoCircle,
  FaHeadset,
} from "react-icons/fa";
import { motion } from "framer-motion";
import home12Logo from "../../../assets/logo-1.png";

const Footer = () => {
  return (
    <footer className="relative mt-8 bg-white/70 dark:bg-black/70 backdrop-blur-xl text-gray-900 dark:text-gray-100 border-t border-white/20 dark:border-gray-800 px-4 py-12">

      {/* Gradient top line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" />

      {/* ================= MAIN GRID ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10"
      >
        {/* Logo & About */}
        <div className="md:col-span-2">
          <NavLink to="/">
            <img
              src={home12Logo}
              alt="logo"
              className="h-12 mb-4 hover:scale-105 transition-transform"
            />
          </NavLink>
          <p className="text-sm opacity-80 max-w-sm">
            AppOrbit is your trusted platform for discovering, sharing, and
            supporting innovative tech products worldwide.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <FaHome /> Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-500">Products</Link></li>
            <li><Link to="/login" className="hover:text-blue-500">Login</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <FaHeadset /> Support
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/faq" className="hover:text-blue-500">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-blue-500">Contact Us</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-500">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <FaInfoCircle /> Contact
          </h3>

          <p className="flex items-center gap-2 text-sm opacity-80">
            <FaEnvelope /> sefat01625@gmail.com
          </p>
          <p className="flex items-center gap-2 text-sm opacity-80 mt-2">
            <FaPhoneAlt /> +880 1625192069
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-xl">
            <motion.a whileHover={{ y: -4 }} href="https://www.facebook.com/abusolaymun.sefat/" target="_blank">
              <FaFacebook className="text-blue-600" />
            </motion.a>
            <motion.a whileHover={{ y: -4 }} href="https://github.com/Abusolaymansefat" target="_blank">
              <FaGithub className="text-gray-800 dark:text-gray-200" />
            </motion.a>
            <motion.a whileHover={{ y: -4 }} href="https://www.linkedin.com/in/abu-solayman-sefat/" target="_blank">
              <FaLinkedin className="text-blue-700" />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* ================= PAYMENT SECTION ================= */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <div className="flex justify-center items-center gap-2 text-sm mb-5 opacity-80">
          <FaLock className="text-green-500" />
          <span>Secure & Trusted Payments</span>
        </div>

        <div className="flex justify-center gap-8 text-5xl">
          <motion.div whileHover={{ scale: 1.2 }}>
            <FaCcVisa className="text-[#1A1F71]" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <FaCcMastercard className="text-[#EB001B]" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <FaCcPaypal className="text-[#003087]" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <FaStripe className="text-[#635BFF]" />
          </motion.div>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/20 dark:border-gray-800 text-center text-sm opacity-80">
        © {new Date().getFullYear()} AppOrbit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
