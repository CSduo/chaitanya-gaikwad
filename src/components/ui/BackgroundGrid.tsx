import React from "react";

export const BackgroundGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Architectural Dot Matrix Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="architectural-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="16" cy="16" r="1" fill="#000000" />
            <path
              d="M 16 0 L 16 2 M 0 16 L 2 16 M 30 16 L 32 16 M 16 30 L 16 32"
              stroke="#000000"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#architectural-grid)" />
      </svg>

      {/* Subtle Ambient Radial Light Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-neutral-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-neutral-200/30 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
