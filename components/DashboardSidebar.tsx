"use client";

import { motion } from "framer-motion";

export default function DashboardSidebar({
  active,
  setActive,
}: {
  active: string;
  setActive: (value: string) => void;
}) {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "internships", label: "Internships" },
    { id: "jobs", label: "Jobs" },
    { id: "hackathons", label: "Hackathons" },
    { id: "research", label: "Research" },
    { id: "campus", label: "Campus Drives" },
    { id: "saved", label: "Saved Jobs" },
    { id: "applied", label: "Applied Jobs" },
    { id: "matches", label: "Matches For You" },
  ];

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-72 hidden lg:flex flex-col p-8 bg-white/5 backdrop-blur-xl border-r border-white/10"
    >
      <h2 className="text-2xl font-bold mb-12 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
        POLARIS
      </h2>

      <div className="space-y-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
              active === tab.id
                ? "bg-gradient-to-r from-yellow-400/20 to-yellow-200/10 border-l-4 border-yellow-400 text-yellow-400"
                : "hover:bg-white/5 text-[#c9d6c4]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </motion.aside>
  );
}
