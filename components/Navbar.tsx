"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-[#0c1611]/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
            POLARIS
          </span>
        </Link>

        {/* Navigation + Auth */}
        <div className="flex items-center gap-8">

          {/* Main Links */}
          <div className="hidden md:flex gap-8 text-[#c9d6c4]">
            <Link
              href="/"
              className="hover:text-white transition duration-200"
            >
              Home
            </Link>
            <Link
              href="/jobs"
              className="hover:text-white transition duration-200"
            >
              Jobs
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            
            <Link
              href="/login"
              className="px-5 py-2 rounded-xl border border-white/20 text-[#f5f1e6] hover:border-yellow-400 hover:text-yellow-400 transition"
            >
              Login
            </Link>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/signup"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#041e14] font-semibold shadow-[0_0_20px_rgba(212,175,55,0.4)] transition"
              >
                Sign Up
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.nav>
  );
}