import React from 'react';
import { motion } from 'motion/react';
import type { SlotConfig } from '../../types/config';
import { ToggleSwitch } from './ToggleSwitch';
import { useMotion } from '../../motion/MotionContext';

interface SlotSelectorProps {
  slots: SlotConfig[];
  activeSlot: number;
  onSelectSlot: (id: number) => void;
  onToggleSlot: (id: number, enabled: boolean) => void;
}

export const SlotSelector: React.FC<SlotSelectorProps> = ({
  slots,
  activeSlot,
  onSelectSlot,
  onToggleSlot,
}) => {
  const { playClick } = useMotion();

  return (
    <div className="flex items-center gap-2.5 my-2">
      {slots.map((slot) => {
        const isActive = slot.id === activeSlot;

        return (
          <motion.div
            key={slot.id}
            onClick={() => {
              if (!isActive) {
                playClick();
                onSelectSlot(slot.id);
              }
            }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            className={`flex items-center justify-between gap-2.5 px-3.5 py-1.5 rounded-md cursor-pointer select-none transition-colors ${
              isActive
                ? 'border-2 border-[#0084ff] bg-[#0c1017] shadow-[0_0_12px_rgba(0,132,255,0.3)]'
                : 'border border-[#171b26] bg-[#12151e] hover:bg-[#181c28]'
            }`}
          >
            <span
              className={`text-xs font-semibold tracking-wide ${
                slot.enabled ? 'text-[#22c55e]' : 'text-[#ef4444]'
              }`}
            >
              {slot.name}
            </span>

            {isActive && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSlot(slot.id, !slot.enabled);
                }}
              >
                <ToggleSwitch
                  size="small"
                  checked={slot.enabled}
                  onChange={(checked) => onToggleSlot(slot.id, checked)}
                />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
