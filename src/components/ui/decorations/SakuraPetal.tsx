import React from "react";

export interface SakuraPetalProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number | string;
  opacity?: number;
  color?: string;
}

export const SakuraPetal: React.FC<SakuraPetalProps> = ({
  className = "",
  size = 48,
  strokeWidth = 1.2,
  opacity = 0.25,
  color = "currentColor",
  style,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none pointer-events-none ${className}`}
      style={{ opacity, ...style }}
      {...props}
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Outer Sakura Petal Outline with iconic top cleft notch */}
        <path d="M 24 5 C 21 8.5 17.5 9 14.5 7.5 C 8.5 16 6.5 28 13.5 37.5 C 18 43 22.5 45.5 24 46.5 C 25.5 45.5 30 43 34.5 37.5 C 41.5 28 39.5 16 33.5 7.5 C 30.5 9 27 8.5 24 5 Z" />
        {/* Primary Central Vein (Midrib) */}
        <path d="M 24 46.5 Q 24 31 24 16" />
        {/* Secondary Lateral Branch Veins */}
        <path d="M 24 38 Q 19 32 16 27" opacity="0.8" />
        <path d="M 24 38 Q 29 32 32 27" opacity="0.8" />
        <path d="M 24 28 Q 20 22 18 18" opacity="0.6" />
        <path d="M 24 28 Q 28 22 30 18" opacity="0.6" />
        {/* Base Taper Terminal Accent Dot */}
        <circle cx="24" cy="46.5" r="0.8" fill={color} stroke="none" />
      </g>
    </svg>
  );
};
