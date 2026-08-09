import React from "react";

export type BlueprintAccentVariant = "coordinate-tag" | "dimension-line" | "scale-bar" | "cross-marker";

export interface BlueprintAccentProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number | string;
  opacity?: number;
  color?: string;
  variant?: BlueprintAccentVariant;
  code?: string;
}

export const BlueprintAccent: React.FC<BlueprintAccentProps> = ({
  className = "",
  width = 220,
  height = 40,
  strokeWidth = 1,
  opacity = 0.25,
  color = "currentColor",
  variant = "coordinate-tag",
  code = "ARCH // SEC-01",
  style,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 220 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none pointer-events-none ${className}`}
      style={{ opacity, ...style }}
      {...props}
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="square">
        {variant === "coordinate-tag" && (
          <>
            <rect x="2" y="8" width="130" height="24" strokeWidth={strokeWidth} />
            <line x1="2" y1="14" x2="8" y2="8" />
            <line x1="126" y1="32" x2="132" y2="26" />
            <line x1="132" y1="20" x2="218" y2="20" strokeDasharray="4 2" strokeWidth={Number(strokeWidth) * 0.75} />
            <circle cx="218" cy="20" r="2" fill={color} stroke="none" />
            <text
              x="12"
              y="24"
              fill={color}
              stroke="none"
              fontSize="9"
              fontFamily="monospace"
              letterSpacing="1.5"
            >
              {code}
            </text>
          </>
        )}

        {variant === "dimension-line" && (
          <>
            <line x1="10" y1="20" x2="210" y2="20" strokeWidth={strokeWidth} />
            <line x1="5" y1="26" x2="15" y2="14" strokeWidth={Number(strokeWidth) * 1.5} />
            <line x1="205" y1="26" x2="215" y2="14" strokeWidth={Number(strokeWidth) * 1.5} />
            <line x1="10" y1="5" x2="10" y2="35" strokeWidth={Number(strokeWidth) * 0.6} />
            <line x1="210" y1="5" x2="210" y2="35" strokeWidth={Number(strokeWidth) * 0.6} />
            <rect x="85" y="10" width="50" height="20" fill="white" stroke={color} strokeWidth={Number(strokeWidth) * 0.7} />
            <text
              x="110"
              y="23"
              fill={color}
              stroke="none"
              fontSize="8"
              fontFamily="monospace"
              textAnchor="middle"
            >
              {code || "SCALE 1:50"}
            </text>
          </>
        )}

        {variant === "scale-bar" && (
          <>
            <line x1="10" y1="25" x2="210" y2="25" strokeWidth={strokeWidth} />
            {[10, 50, 90, 130, 170, 210].map((x) => (
              <line key={x} x1={x} y1="17" x2={x} y2="25" strokeWidth={Number(strokeWidth) * 1.2} />
            ))}
            {[30, 70, 110, 150, 190].map((x) => (
              <line key={x} x1={x} y1="21" x2={x} y2="25" strokeWidth={Number(strokeWidth) * 0.7} />
            ))}
            <text x="10" y="12" fill={color} stroke="none" fontSize="7" fontFamily="monospace">0m</text>
            <text x="90" y="12" fill={color} stroke="none" fontSize="7" fontFamily="monospace">5m</text>
            <text x="200" y="12" fill={color} stroke="none" fontSize="7" fontFamily="monospace">10m</text>
          </>
        )}

        {variant === "cross-marker" && (
          <>
            <line x1="100" y1="5" x2="100" y2="35" strokeDasharray="3 3" />
            <line x1="85" y1="20" x2="115" y2="20" strokeDasharray="3 3" />
            <circle cx="100" cy="20" r="8" strokeWidth={strokeWidth} />
            <circle cx="100" cy="20" r="2" fill={color} stroke="none" />
          </>
        )}
      </g>
    </svg>
  );
};
