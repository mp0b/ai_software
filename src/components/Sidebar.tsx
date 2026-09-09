import React from 'react';
import { Mouse, ShieldCheck, Settings, User } from 'lucide-react';
import { motion } from 'motion/react';
import { RavenLogo } from './RavenLogo';
import { useConfig } from '../context/ConfigContext';
import { useMotion } from '../motion/MotionContext';
import { startWindowDrag } from '../utils/windowDrag';
import type { MainCategory } from '../types/config';

// Discord SVG Icon
const DiscordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

export const Sidebar: React.FC = () => {
  const { mainCategory, setMainCategory, setModalContent, showWelcome, setShowWelcome } = useConfig();
  const { playTabSwitch, playClick } = useMotion();

  const handleDiscordClick = () => {
    playClick();
    setModalContent({
      title: 'Raven Community',
      component: (
        <div className="flex flex-col gap-3 py-2">
          <p className="text-sm text-[#cbd5e1]">
            Join the official Raven AI community for configuration presets, updates, and 24/7 support.
          </p>
          <div className="p-3 bg-[#161a25] border border-[#232a3b] rounded-lg text-center font-mono text-xs text-[#0091ff]">
            discord.gg/raven
          </div>
          <button
            type="button"
            onClick={() => {
              playClick();
              navigator.clipboard?.writeText('https://discord.gg/raven');
              alert('Raven invite link copied to clipboard!');
            }}
            className="w-full py-2 bg-[#0084ff] hover:bg-[#0073e6] text-white rounded-md text-xs font-semibold tracking-wide transition-colors cursor-pointer"
          >
            Copy Invite Link
          </button>
        </div>
      ),
    });
  };

  const navItems: { id: MainCategory; icon: React.ReactNode; label: string }[] = [
    {
      id: 'mouse',
      icon: <Mouse size={21} strokeWidth={1.8} />,
      label: 'Aiming & Weapons',
    },
    {
      id: 'shield',
      icon: <ShieldCheck size={21} strokeWidth={1.8} />,
      label: 'Security & Recoil',
    },
    {
      id: 'settings',
      icon: <Settings size={21} strokeWidth={1.8} />,
      label: 'Game & AI Settings',
    },
    {
      id: 'user',
      icon: <User size={21} strokeWidth={1.8} />,
      label: 'Configs & Information',
    },
  ];

  return (
    <div
      data-tauri-drag-region
      onMouseDown={startWindowDrag}
      className="w-[72px] h-full bg-[#06070a]/90 backdrop-blur-md border-r border-[#141722] flex flex-col items-center py-5 select-none z-10"
    >
      {/* Raven stylized R Logo (click toggles Welcome screen) */}
      <motion.div
        onClick={() => {
          playTabSwitch();
          setShowWelcome(!showWelcome);
        }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        className="mb-8 cursor-pointer relative"
        title="Raven AI - Model Select"
      >
        <RavenLogo className="w-9 h-9" />
      </motion.div>

      {/* Main navigation icons with sliding active indicator */}
      <div className="flex flex-col items-center gap-6 flex-1 w-full relative">
        {navItems.map((item) => {
          const isActive = !showWelcome && mainCategory === item.id;
          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => {
                if (!isActive) {
                  playTabSwitch();
                  setShowWelcome(false);
                  setMainCategory(item.id);
                }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              title={item.label}
              className={`relative p-2.5 rounded-xl cursor-pointer transition-colors duration-200 ${
                isActive
                  ? 'text-white'
                  : 'text-[#4b5563] hover:text-[#cbd5e1]'
              }`}
            >
              {/* Sliding glowing background pill */}
              {isActive && (
                <motion.div
                  layoutId="activeSidebarIndicator"
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 32,
                  }}
                  className="absolute inset-0 bg-[#0091ff]/20 border border-[#0091ff]/50 rounded-xl shadow-[0_0_14px_rgba(0,145,255,0.4)]"
                />
              )}

              <span className="relative z-10">{item.icon}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Discord Icon at bottom */}
      <div className="pt-4 border-t border-[#141722]/60 w-full flex justify-center">
        <motion.button
          type="button"
          onClick={handleDiscordClick}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          title="Raven Discord Community"
          className="text-[#4b5563] hover:text-[#5865F2] transition-colors p-2 cursor-pointer"
        >
          <DiscordIcon className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};
