import React from "react";

export interface SakuraBranchProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number | string;
  opacity?: number;
  color?: string;
  flipX?: boolean;
}

export const SakuraBranch: React.FC<SakuraBranchProps> = ({
  className = "",
  width = 240,
  height = 180,
  strokeWidth = 1.2,
  opacity = 0.25,
  color = "currentColor",
  flipX = false,
  style,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none pointer-events-none ${className}`}
      style={{
        opacity,
        transform: flipX ? "scaleX(-1)" : undefined,
        ...style,
      }}
      {...props}
    >
      <g stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* Main Tapering Stem */}
        <path
          d="M 10 170 Q 50 140 90 120 T 170 60 T 230 20"
          strokeWidth={Number(strokeWidth) * 1.8}
        />
        {/* Secondary Offshoot Twigs */}
        <path d="M 65 132 Q 95 105 110 75" strokeWidth={Number(strokeWidth) * 1.3} />
        <path d="M 125 90 Q 155 70 185 55" strokeWidth={Number(strokeWidth) * 1.2} />
        <path d="M 170 60 Q 190 35 210 25" strokeWidth={Number(strokeWidth) * 1.0} />

        {/* Architectural Node Ticks */}
        <g strokeWidth={Number(strokeWidth) * 0.6} opacity="0.6">
          <line x1="60" y1="130" x2="70" y2="134" />
          <line x1="120" y1="88" x2="130" y2="92" />
          <line x1="165" y1="58" x2="175" y2="62" />
          <circle cx="90" cy="120" r="3" strokeDasharray="1 1" />
          <circle cx="170" cy="60" r="3" strokeDasharray="1 1" />
        </g>

        {/* Blossom Clusters */}
        <g transform="translate(110, 75) scale(0.38)">
          <path d="M 0 -36 C -5 -28 -14 -28 -22 -32 C -28 -14 -24 -2 -10 6 C -4 10 0 12 0 16 C 0 12 4 10 10 6 C 24 -2 28 -14 22 -32 C 14 -28 5 -28 0 -36 Z" />
          <circle cx="0" cy="0" r="6" />
        </g>
        <g transform="translate(185, 55) scale(0.32)">
          <circle cx="0" cy="0" r="5" />
          <path d="M 0 -30 Q 0 -15 0 0" />
          <line x1="-10" y1="-10" x2="10" y2="10" />
          <line x1="-10" y1="10" x2="10" y2="-10" />
        </g>

        {/* Flower Buds */}
        <g transform="translate(230, 20)">
          <path d="M 0 0 C 4 -6 8 -6 10 -4 C 12 2 8 8 0 10 C -2 6 -2 2 0 0 Z" />
          <line x1="0" y1="10" x2="-5" y2="14" />
        </g>
        <g transform="translate(210, 25)">
          <path d="M 0 0 C 3 -5 7 -5 9 -3 C 10 2 7 7 0 8 C -1 5 -1 2 0 0 Z" />
        </g>

        {/* Drifting Wind Petals */}
        <g transform="translate(140, 120) rotate(25) scale(0.4)">
          <path d="M 24 5 C 21 8.5 17.5 9 14.5 7.5 C 8.5 16 6.5 28 13.5 37.5 C 18 43 22.5 45.5 24 46.5 C 25.5 45.5 30 43 34.5 37.5 C 41.5 28 39.5 16 33.5 7.5 C 30.5 9 27 8.5 24 5 Z" />
        </g>
        <g transform="translate(195, 100) rotate(-15) scale(0.35)">
          <path d="M 24 5 C 21 8.5 17.5 9 14.5 7.5 C 8.5 16 6.5 28 13.5 37.5 C 18 43 22.5 45.5 24 46.5 C 25.5 45.5 30 43 34.5 37.5 C 41.5 28 39.5 16 33.5 7.5 C 30.5 9 27 8.5 24 5 Z" />
        </g>
      </g>
    </svg>
  );
};
