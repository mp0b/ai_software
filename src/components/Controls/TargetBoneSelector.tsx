import React from 'react';
import { motion } from 'motion/react';
import type { TargetBone } from '../../types/config';
import { useMotion } from '../../motion/MotionContext';

interface TargetBoneSelectorProps {
  selected: TargetBone;
  onChange: (bone: TargetBone) => void;
}

const BONES: TargetBone[] = ['Head', 'Neck', 'Body', 'Random', 'Custom'];

export const TargetBoneSelector: React.FC<TargetBoneSelectorProps> = ({ selected, onChange }) => {
  const { playClick } = useMotion();

  return (
    <div className="flex items-center gap-6 py-2 select-none">
      {BONES.map((bone) => {
        const isSelected = selected === bone;
        return (
          <motion.div
            key={bone}
            onClick={() => {
              if (!isSelected) {
                playClick();
                onChange(bone);
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div
              className={`w-3.5 h-3.5 rounded-full transition-all flex items-center justify-center ${
                isSelected
                  ? 'bg-[#0091ff] shadow-[0_0_8px_rgba(0,145,255,0.7)]'
                  : 'bg-[#1a1f2c] group-hover:bg-[#252c3d]'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="boneIndicatorDot"
                  className="w-1.5 h-1.5 rounded-full bg-white"
                />
              )}
            </div>
            <span
              className={`text-sm tracking-wide transition-colors ${
                isSelected
                  ? 'text-white font-medium'
                  : 'text-[#64748b] group-hover:text-[#94a3b8]'
              }`}
            >
              {bone}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};
