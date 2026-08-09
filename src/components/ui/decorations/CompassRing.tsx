import React from "react";

export interface CompassRingProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  strokeWidth?: number | string;
  opacity?: number;
  color?: string;
  showCardinalTicks?: boolean;
}

export const CompassRing: React.FC<CompassRingProps> = ({
  className = "",
  size = 180,
  strokeWidth = 1,
  opacity = 0.2,
  color = "currentColor",
  showCardinalTicks = true,
  style,
  ...props
}) => {
  const majorTicks = Array.from({ length: 12 }, (_, i) => i * 30);
  const minorTicks = Array.from({ length: 36 }, (_, i) => i * 10).filter(
    (deg) => deg % 30 !== 0
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none pointer-events-none ${className}`}
      style={{ opacity, ...style }}
      {...props}
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        {/* Azimuth Rings */}
        <circle cx="100" cy="100" r="90" strokeWidth={Number(strokeWidth) * 1.2} />
        <circle cx="100" cy="100" r="82" strokeDasharray="2 3" strokeWidth={Number(strokeWidth) * 0.75} />
        <circle cx="100" cy="100" r="64" strokeWidth={Number(strokeWidth) * 0.8} />
        <circle cx="100" cy="100" r="30" strokeDasharray="1 2" strokeWidth={Number(strokeWidth) * 0.6} />

        {/* Center Crosshairs */}
        <line x1="100" y1="5" x2="100" y2="195" strokeWidth={Number(strokeWidth) * 0.5} strokeDasharray="4 4" />
        <line x1="5" y1="100" x2="195" y2="100" strokeWidth={Number(strokeWidth) * 0.5} strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="3" strokeWidth={strokeWidth} />

        {/* Major Degree Ticks */}
        {majorTicks.map((deg) => (
          <line
            key={`major-${deg}`}
            x1="100"
            y1="10"
            x2="100"
            y2="18"
            transform={`rotate(${deg} 100 100)`}
            strokeWidth={Number(strokeWidth) * 1.2}
          />
        ))}

        {/* Minor Degree Ticks */}
        {minorTicks.map((deg) => (
          <line
            key={`minor-${deg}`}
            x1="100"
            y1="10"
            x2="100"
            y2="14"
            transform={`rotate(${deg} 100 100)`}
            strokeWidth={Number(strokeWidth) * 0.65}
            opacity="0.7"
          />
        ))}

        {/* North Arrow Pointer */}
        <polygon points="100,2 96,10 104,10" fill={color} stroke="none" />

        {/* Cardinal Direction Indicators */}
        {showCardinalTicks && (
          <g fill={color} stroke="none" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            <text x="100" y="27">N</text>
            <text x="178" y="103">E</text>
            <text x="100" y="179">S</text>
            <text x="23" y="103">W</text>
          </g>
        )}
      </g>
    </svg>
  );
};
