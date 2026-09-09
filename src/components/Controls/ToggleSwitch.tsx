import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMotion } from '../../motion/MotionContext';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'normal' | 'small';
  disabled?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  size = 'normal',
  disabled = false,
}) => {
  const { playToggle } = useMotion();
  const [isPressing, setIsPressing] = useState(false);
  const isSmall = size === 'small';

  const handleToggle = () => {
    if (disabled) return;
    const nextState = !checked;
    playToggle(nextState);
    onChange(nextState);
  };

  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleToggle}
      onMouseDown={() => setIsPressing(true)}
      onMouseUp={() => setIsPressing(false)}
      onMouseLeave={() => setIsPressing(false)}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.94 }}
      className={`relative inline-flex items-center rounded-full focus:outline-none cursor-pointer select-none transition-colors duration-200 ${
        isSmall ? 'w-8 h-4 px-0.5' : 'w-[42px] h-[22px] px-1'
      } ${
        checked
          ? 'bg-[#0084ff] shadow-[0_0_12px_rgba(0,132,255,0.45)]'
          : 'bg-[#1a1e2a] hover:bg-[#232838]'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {/* Energy ripple ring on activation */}
      <AnimatePresence>
        {checked && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1.7, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border border-[#38bdf8] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Physics spring thumb */}
      <motion.span
        layout
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 34,
        }}
        animate={{
          x: checked ? (isSmall ? 16 : 20) : 0,
          scaleX: isPressing ? 1.25 : 1,
          scaleY: isPressing ? 0.88 : 1,
        }}
        className={`inline-block rounded-full shadow-md pointer-events-none ${
          isSmall ? 'w-3 h-3' : 'w-4 h-4'
        } ${checked ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-[#94a3b8]'}`}
      />
    </motion.button>
  );
};
