import React from 'react';

export const NyronLogo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_10px_rgba(0,162,255,0.4)]"
      >
        {/* Left White Arm */}
        <polygon
          points="8,6 15,6 15,25 8,30"
          fill="#FFFFFF"
        />
        {/* Center Diagonal connecting fold */}
        <polygon
          points="15,16 23,28 17,28"
          fill="#E2E8F0"
        />
        {/* Right Cyan Arm */}
        <polygon
          points="23,10 30,15 30,34 23,34"
          fill="#00A2FF"
        />
        {/* Dynamic Light Accent */}
        <polygon
          points="15,20 23,31 23,22 15,12"
          fill="#38BDF8"
        />
      </svg>
    </div>
  );
};
