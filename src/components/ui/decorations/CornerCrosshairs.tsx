import React from "react";

export type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface CornerCrosshairsProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number | string;
  opacity?: number;
  color?: string;
  position?: CornerPosition;
  label?: string;
}

export const CornerCrosshairs: React.FC<CornerCrosshairsProps> = ({
  className = "",
  size = 80,
  strokeWidth = 1,
  opacity = 0.25,
  color = "currentColor",
  position = "top-left",
  label,
  style,
  ...props
}) => {
  const rotationMap: Record<CornerPosition, number> = {
    "top-left": 0,
    "top-right": 90,
    "bottom-right": 180,
    "bottom-left": 270,
  };

  const rotation = rotationMap[position];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none pointer-events-none ${className}`}
      style={{
        opacity,
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        ...style,
      }}
      {...props}
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="square">
        {/* Outer Corner Frame */}
        <path d="M 6 36 L 6 6 L 36 6" />

        {/* Crosshair Axes */}
        <line x1="0" y1="24" x2="64" y2="24" />
        <line x1="24" y1="0" x2="24" y2="64" />

        {/* Target Concentric Circles */}
        <circle cx="24" cy="24" r="10" strokeWidth={Number(strokeWidth) * 0.8} />
        <circle cx="24" cy="24" r="3" strokeWidth={Number(strokeWidth) * 0.7} />

        {/* Axis Measurement Ticks */}
        <line x1="34" y1="21" x2="34" y2="27" />
        <line x1="44" y1="22" x2="44" y2="26" />
        <line x1="54" y1="21" x2="54" y2="27" />
        <line x1="21" y1="34" x2="27" y2="34" />
        <line x1="22" y1="44" x2="26" y2="44" />
        <line x1="21" y1="54" x2="27" y2="54" />

        {/* Diagonal Drafting Guideline */}
        <line x1="6" y1="6" x2="16" y2="16" strokeDasharray="2 2" strokeWidth={Number(strokeWidth) * 0.6} />

        {/* Architectural Label Text */}
        {label && (
          <text
            x="38"
            y="16"
            fill={color}
            stroke="none"
            fontSize="6"
            fontFamily="monospace"
            letterSpacing="1"
            opacity="0.8"
          >
            {label}
          </text>
        )}
      </g>
    </svg>
  );
};
