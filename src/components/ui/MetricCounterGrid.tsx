import React from "react";
import { motion } from "motion/react";
import { SpotlightCard } from "./SpotlightCard";

interface MetricItem {
  value: string;
  label: string;
  sublabel: string;
  tag?: string;
}

const METRICS: MetricItem[] = [
  {
    value: "$1,000",
    label: "Flagship Contract",
    sublabel: "Bahrain Luxury CAD Package",
    tag: "Verified",
  },
  {
    value: "10,000+",
    label: "B2B Lead Intelligence",
    sublabel: "Middle East & Asia Data",
    tag: "Redacted",
  },
  {
    value: "40+",
    label: "3D Spatial Visuals",
    sublabel: "High-Fidelity Renders",
    tag: "Portfolio",
  },
  {
    value: "100%",
    label: "Production Accuracy",
    sublabel: "AutoCAD & DXF Deliverables",
    tag: "Standard",
  },
];

export const MetricCounterGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full my-8">
      {METRICS.map((metric, idx) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.08, duration: 0.5 }}
        >
          <SpotlightCard className="p-5 rounded-2xl bg-neutral-50/80 border border-black/10 shadow-sm hover:border-black/30 transition-all flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-black text-white">
                {metric.tag}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-black/30" />
            </div>
            <div className="space-y-1">
              <p className="serif text-3xl font-bold tracking-tight text-black">
                {metric.value}
              </p>
              <p className="text-[11px] font-bold text-black uppercase tracking-wider">
                {metric.label}
              </p>
              <p className="text-[10px] text-black/50 font-medium leading-tight">
                {metric.sublabel}
              </p>
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  );
};
