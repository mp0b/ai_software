import React, { useState, useRef } from 'react';
import { Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useMotion } from '../../motion/MotionContext';

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  formatDecimals?: number;
  hasGear?: boolean;
  onGearClick?: () => void;
  tooltipText?: string;
  onChange: (val: number) => void;
}

export const SliderRow: React.FC<SliderRowProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  formatDecimals = 0,
  hasGear = false,
  onGearClick,
  tooltipText,
  onChange,
}) => {
  const { playSliderTick, playClick } = useMotion();
  const [isDragging, setIsDragging] = useState(false);
  const lastTickValue = useRef<number>(value);

  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const displayValue =
    formatDecimals > 0
      ? `${value.toFixed(formatDecimals)}${unit ? (unit === '%' ? '%' : ` ${unit}`) : ''}`
      : `${value}${unit ? (unit === '%' ? '%' : ` ${unit}`) : ''}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseFloat(e.target.value);
    // Play tick sound if value changed noticeably
    if (Math.abs(newVal - lastTickValue.current) >= (step || 1)) {
      playSliderTick();
      lastTickValue.current = newVal;
    }
    onChange(newVal);
  };

  return (
    <div className="flex flex-col gap-1.5 py-1 select-none">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-[#cbd5e1] font-normal tracking-wide">
          <span>{label}</span>
          {tooltipText && (
            <span
              className="ml-1 text-[#d97706] text-xs font-medium cursor-help transition-transform hover:scale-110"
              title={tooltipText}
            >
              (?)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[#cbd5e1] font-normal tracking-wide">
          <motion.span
            key={displayValue}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="font-mono text-xs text-[#e2e8f0]"
          >
            {displayValue}
          </motion.span>
          {hasGear && (
            <motion.button
              type="button"
              onClick={() => {
                playClick();
                onGearClick?.();
              }}
              whileHover={{ rotate: 90, scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="text-[#64748b] hover:text-[#0091ff] transition-colors cursor-pointer p-0.5"
              title="Configure"
            >
              <Settings size={14} />
            </motion.button>
          )}
        </div>
      </div>

      <div className="relative flex items-center w-full h-5">
        {/* Floating tooltip badge when dragging */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.8 }}
              animate={{ opacity: 1, y: -22, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              style={{ left: `calc(${percentage}% - 16px)` }}
              className="absolute pointer-events-none z-20 px-1.5 py-0.5 bg-[#0091ff] text-white text-[10px] font-bold rounded shadow-[0_0_10px_rgba(0,145,255,0.7)]"
            >
              {displayValue}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow track under active portion */}
        <div
          className="absolute left-0 h-1 rounded-full pointer-events-none transition-all duration-75"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, #0070f3 0%, #00d2ff 100%)',
            boxShadow: isDragging ? '0 0 8px rgba(0, 210, 255, 0.6)' : 'none',
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onChange={handleChange}
          className="w-full h-1 rounded-full cursor-pointer appearance-none outline-none z-10 bg-transparent"
          style={{
            background: `linear-gradient(to right, transparent 0%, transparent ${percentage}%, #181c26 ${percentage}%, #181c26 100%)`,
          }}
        />
      </div>
    </div>
  );
};
