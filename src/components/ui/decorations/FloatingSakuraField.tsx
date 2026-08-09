import React from "react";
import { motion } from "motion/react";
import { SakuraPetal } from "./SakuraPetal";
import { SakuraBranch } from "./SakuraBranch";
import { CornerCrosshairs } from "./CornerCrosshairs";
import { CompassRing } from "./CompassRing";

export const FloatingSakuraField: React.FC = () => {
  // Preset drifting petals with unique animation delays and positions
  const petals = [
    { id: 1, top: "12%", left: "8%", size: 36, delay: 0, duration: 9, rotate: [0, 45, 90, 45, 0] },
    { id: 2, top: "22%", right: "10%", size: 42, delay: 1.5, duration: 11, rotate: [0, -35, -70, -35, 0] },
    { id: 3, top: "55%", left: "5%", size: 30, delay: 3, duration: 10, rotate: [10, 60, 110, 60, 10] },
    { id: 4, top: "68%", right: "6%", size: 38, delay: 2, duration: 12, rotate: [-10, -50, -90, -50, -10] },
    { id: 5, top: "85%", left: "12%", size: 28, delay: 4, duration: 8, rotate: [0, 40, 80, 40, 0] },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Top-Left Sakura Botanical Branch Flourish */}
      <div className="absolute -top-10 -left-12 opacity-15 hidden sm:block">
        <SakuraBranch width={280} height={210} color="#000000" strokeWidth={1} />
      </div>

      {/* 2. Top-Right Sakura Botanical Branch Flourish (Mirrored) */}
      <div className="absolute -top-10 -right-12 opacity-15 hidden sm:block">
        <SakuraBranch width={280} height={210} color="#000000" strokeWidth={1} flipX />
      </div>

      {/* 3. Architectural Compass Ring in Background */}
      <div className="absolute top-1/4 right-[8%] opacity-10 hidden md:block">
        <CompassRing size={160} color="#000000" strokeWidth={0.8} />
      </div>

      {/* 4. Architectural Corner Crosshairs */}
      <div className="absolute top-6 left-6 opacity-20">
        <CornerCrosshairs size={40} color="#000000" strokeWidth={1} />
      </div>
      <div className="absolute top-6 right-6 opacity-20">
        <CornerCrosshairs size={40} color="#000000" strokeWidth={1} />
      </div>

      {/* 5. Ambient Floating Drifting Petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            top: petal.top,
            left: petal.left,
            right: petal.right,
          }}
          animate={{
            y: [0, -18, 0, 18, 0],
            x: [0, 12, 0, -12, 0],
            rotate: petal.rotate,
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: petal.delay,
          }}
        >
          <SakuraPetal size={petal.size} color="#000000" opacity={0.16} strokeWidth={1} />
        </motion.div>
      ))}
    </div>
  );
};
