import React from "react";

export interface SakuraBlossomProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number | string;
  opacity?: number;
  color?: string;
  showCenterGrid?: boolean;
}

export const SakuraBlossom: React.FC<SakuraBlossomProps> = ({
  className = "",
  size = 96,
  strokeWidth = 1.2,
  opacity = 0.25,
  color = "currentColor",
  showCenterGrid = true,
  style,
  ...props
}) => {
  const petalAngles = [0, 72, 144, 216, 288];
  const stamenAngles = [15, 51, 87, 123, 159, 195, 231, 267, 303, 339];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none pointer-events-none ${className}`}
      style={{ opacity, ...style }}
      {...props}
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Architectural Center Grid Accents */}
        {showCenterGrid && (
          <g opacity="0.4" strokeWidth={Number(strokeWidth) * 0.6}>
            <line x1="50" y1="2" x2="50" y2="98" strokeDasharray="2 2" />
            <line x1="2" y1="50" x2="98" y2="50" strokeDasharray="2 2" />
            <circle cx="50" cy="50" r="44" strokeDasharray="1 3" />
          </g>
        )}

        {/* 5 Radial Sakura Petals */}
        {petalAngles.map((angle, index) => (
          <g key={`petal-${index}`} transform={`rotate(${angle} 50 50)`}>
            <path d="M 50 14 C 47 18 43 19 39 17 C 32 26 30 38 38 46 C 43 50 48 52 50 53 C 52 50 57 50 62 46 C 70 38 68 26 61 17 C 57 19 53 18 50 14 Z" />
            <path d="M 50 53 Q 50 38 50 24" strokeWidth={Number(strokeWidth) * 0.8} />
            <path d="M 50 44 Q 45 37 42 32" strokeWidth={Number(strokeWidth) * 0.6} opacity="0.7" />
            <path d="M 50 44 Q 55 37 58 32" strokeWidth={Number(strokeWidth) * 0.6} opacity="0.7" />
          </g>
        ))}

        {/* Central Receptacle Ring */}
        <circle cx="50" cy="50" r="7" strokeWidth={strokeWidth} fill="none" />
        <circle cx="50" cy="50" r="3.5" strokeWidth={Number(strokeWidth) * 0.8} />

        {/* Stamen Filaments & Anther Dots */}
        {stamenAngles.map((angle, index) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 50 + 7 * Math.cos(rad);
          const y1 = 50 + 7 * Math.sin(rad);
          const x2 = 50 + 17 * Math.cos(rad);
          const y2 = 50 + 17 * Math.sin(rad);
          return (
            <g key={`stamen-${index}`}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={Number(strokeWidth) * 0.75} />
              <circle cx={x2} cy={y2} r="1" fill={color} stroke="none" />
            </g>
          );
        })}
      </g>
    </svg>
  );
};
