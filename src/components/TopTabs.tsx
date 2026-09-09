import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { useConfig } from '../context/ConfigContext';
import { useMotion } from '../motion/MotionContext';
import { startWindowDrag } from '../utils/windowDrag';
import type { MouseSubTab, ShieldSubTab, SettingsSubTab, UserSubTab, SubTab } from '../types/config';

export const TopTabs: React.FC = () => {
  const { mainCategory, subTab, setSubTab, showWelcome } = useConfig();
  const { playTabSwitch, playClick } = useMotion();

  const handleClose = async () => {
    playClick();
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      const appWindow = getCurrentWindow();
      await appWindow.close();
    } catch {
      console.log('Close window requested');
    }
  };

  const getTabsForCategory = (): SubTab[] => {
    switch (mainCategory) {
      case 'mouse':
        return ['Aiming', 'Weapon-Slots', 'Humanization'] as MouseSubTab[];
      case 'shield':
        return ['Sticky-Aim', 'Triggerbot', 'RCS', 'Prefire', 'Visuals'] as ShieldSubTab[];
      case 'settings':
        return ['Game-Settings', 'General', 'AI', 'Style'] as SettingsSubTab[];
      case 'user':
        return ['Configs', 'Information'] as UserSubTab[];
    }
  };

  const tabs = getTabsForCategory();

  if (showWelcome) {
    return (
      <div
        data-tauri-drag-region
        onMouseDown={startWindowDrag}
        className="flex items-center justify-between pt-5 pb-4 px-6 border-b border-transparent select-none cursor-default z-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col pointer-events-none"
        >
          <span className="text-white font-semibold text-lg tracking-wide">Welcome!</span>
          <span className="text-xs text-[#6b7280]">please select a model:</span>
        </motion.div>

        <motion.button
          type="button"
          onClick={handleClose}
          whileHover={{ scale: 1.15, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="text-[#64748b] hover:text-white transition-colors cursor-pointer p-1 -mr-1"
          title="Close"
        >
          <X size={18} strokeWidth={2.2} />
        </motion.button>
      </div>
    );
  }

  return (
    <div
      data-tauri-drag-region
      onMouseDown={startWindowDrag}
      className="flex items-center justify-between pt-5 pb-4 px-6 border-b border-transparent select-none cursor-default z-10"
    >
      {/* Sub Tabs list with animated sliding beam */}
      <div className="flex items-center gap-7">
        {tabs.map((tab) => {
          const isActive = subTab === tab;
          return (
            <motion.div
              key={tab}
              onClick={() => {
                if (!isActive) {
                  playTabSwitch();
                  setSubTab(tab);
                }
              }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="relative cursor-pointer py-1 group"
            >
              <span
                className={`text-[15px] transition-colors tracking-wide ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#6b7280] font-medium group-hover:text-[#9ca3af]'
                }`}
              >
                {tab}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeSubTabIndicator"
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 32,
                  }}
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0091ff] rounded-full shadow-[0_0_10px_rgba(0,145,255,0.8)]"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Top right close icon */}
      <motion.button
        type="button"
        onClick={handleClose}
        whileHover={{ scale: 1.15, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="text-[#64748b] hover:text-white transition-colors cursor-pointer p-1 -mr-1"
        title="Close"
      >
        <X size={18} strokeWidth={2.2} />
      </motion.button>
    </div>
  );
};
