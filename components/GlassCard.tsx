"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  clickable?: boolean;
  className?: string;
}

export default function GlassCard({
  children,
  onClick,
  clickable = false,
  className = "",
}: GlassCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={
        clickable
          ? {
              y: -8,
              scale: 1.03,
            }
          : {
              y: -4,
            }
      }
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className={`
        relative
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-8
        overflow-hidden
        transition-all
        duration-300
        hover:border-yellow-400/40
        hover:shadow-[0_0_35px_rgba(212,175,55,0.25)]
        ${clickable ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {/* subtle internal gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-3xl" />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}