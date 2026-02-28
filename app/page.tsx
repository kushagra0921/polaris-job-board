"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { jobs } from "@/data/jobs";

/* ---------- COUNT UP ---------- */
function CountUp({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 900;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return <span>{count}</span>;
}

export default function Home() {
  const totalListings = jobs.length;
  const companies = [...new Set(jobs.map(j => j.company))].length;
  const studentsImpacted = totalListings * 10;

  const stats = [
    { label: "Active Listings", value: totalListings },
    { label: "Partner Companies", value: companies },
    { label: "Students Impacted", value: studentsImpacted },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#041e14] text-[#f5f1e6]">
      <Navbar />

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-7xl font-bold leading-tight tracking-tight"
        >
          Your North Star for{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
            Career Growth
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-lg text-[#c9d6c4] max-w-3xl mx-auto"
        >
          POLARIS consolidates internships, placements, and remote roles into
          one intelligent dashboard — giving students strategic visibility,
          real-time insights, and a competitive edge.
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12"
        >
          <Link
            href="/jobs"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-300 text-[#041e14] px-10 py-4 rounded-2xl font-bold shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300"
          >
            Explore Opportunities →
          </Link>
        </motion.div>
      </motion.section>

      {/* STATS */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 max-w-6xl mx-auto px-6 pb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-4xl font-bold text-yellow-400">
                <CountUp value={item.value} />+
              </h3>
              <p className="mt-3 text-[#c9d6c4] uppercase tracking-wide text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* FEATURES */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7 }}
        className="relative z-10 max-w-7xl mx-auto px-6 pb-32"
      >
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all">
            <h3 className="text-2xl font-bold mb-4">
              Intelligent Filtering Engine
            </h3>
            <p className="text-[#c9d6c4]">
              Filter opportunities by category, experience, deadline,
              and location with real-time refinement.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all">
            <h3 className="text-2xl font-bold mb-4">
              Live Career Intelligence
            </h3>
            <p className="text-[#c9d6c4]">
              Visual dashboards provide actionable insights into
              opportunity distribution and growth trends.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}