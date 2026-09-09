import React from 'react';
import { motion } from 'motion/react';

export const RavenLogo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => {
  return (
    <motion.div
      whileHover={{
        rotateY: 15,
        rotateX: -10,
        scale: 1.12,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      {/* Ambient Reactor Core Glow */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.7, 0.35],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-[#0091ff] rounded-full blur-[14px] pointer-events-none"
      />

      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_0_12px_rgba(0,162,255,0.7)]"
      >
        {/* Left White Stem of "R" */}
        <polygon points="8,6 15,6 15,34 8,34" fill="#FFFFFF" />

        {/* Top bar connecting */}
        <polygon points="15,6 26,6 29,10 15,10" fill="#FFFFFF" />

        {/* Upper Loop of "R" in vibrant Cyan */}
        <polygon
          points="25,6 32,13 32,18 25,23 15,23 15,19 23,19 27,16 27,14 23,10 15,10 15,6"
          fill="#00A2FF"
        />

        {/* Diagonal Wing / Leg of "R" */}
        <polygon points="19,21 26,21 33,34 26,34" fill="#38BDF8" />

        {/* Dynamic Inner Highlight */}
        <polygon points="15,10 21,10 24,14 21,18 15,18" fill="#08090D" />
      </svg>
    </motion.div>
  );
};
