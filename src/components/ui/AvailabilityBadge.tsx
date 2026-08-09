import React from "react";
import { motion } from "motion/react";

interface AvailabilityBadgeProps {
  text?: string;
  className?: string;
}

export const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({
  text = "Available for CAD Drafting & Creative Direction",
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-50 border border-black/10 shadow-sm backdrop-blur-md ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-black/80">
        {text}
      </span>
    </motion.div>
  );
};
