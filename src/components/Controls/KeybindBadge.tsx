import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useMotion } from '../../motion/MotionContext';

interface KeybindBadgeProps {
  value: string;
  onChange: (key: string) => void;
}

export const KeybindBadge: React.FC<KeybindBadgeProps> = ({ value, onChange }) => {
  const { playClick } = useMotion();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!isListening) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      let keyName = e.key;
      if (e.code === 'Space') keyName = 'Space';
      else if (e.key === 'Control') keyName = 'Ctrl';
      else if (e.key === 'Escape') keyName = 'Escape';
      else if (e.key === 'Alt') keyName = 'Alt';
      else if (e.key === 'Shift') keyName = 'Shift';
      else if (e.key.length === 1) keyName = e.key.toUpperCase();

      playClick();
      onChange(keyName);
      setIsListening(false);
    };

    const handleClickOutside = () => {
      setIsListening(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isListening, onChange, playClick]);

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      onClick={(e) => {
        e.stopPropagation();
        playClick();
        setIsListening(!isListening);
      }}
      className={`min-w-[64px] px-3.5 py-1 rounded-md text-xs font-medium tracking-wide transition-all border outline-none cursor-pointer ${
        isListening
          ? 'bg-[#0084ff]/20 text-[#0091ff] border-[#0084ff] animate-pulse shadow-[0_0_12px_rgba(0,145,255,0.4)]'
          : 'bg-[#141722] text-[#cbd5e1] border-[#1d2230] hover:bg-[#1a1e2c] hover:text-white hover:border-[#0091ff]/40'
      }`}
    >
      {isListening ? '...' : value}
    </motion.button>
  );
};
