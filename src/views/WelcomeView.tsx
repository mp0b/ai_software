import React, { useState } from 'react';
import { Monitor, Keyboard, Gamepad2, FastForward, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { useConfig } from '../context/ConfigContext';
import { useMotion } from '../motion/MotionContext';
import { TiltCard } from '../motion/TiltCard';

export const WelcomeView: React.FC = () => {
  const { config, updateConfig, setShowWelcome, setMainCategory } = useConfig();
  const { playLaunchEngine, playClick } = useMotion();
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    playLaunchEngine();

    setTimeout(() => {
      setShowWelcome(false);
      setMainCategory('mouse');
      setIsLaunching(false);
    }, 450);
  };

  return (
    <div className="flex flex-col gap-4 px-6 py-2 select-none">
      {/* 2 Main Columns with 3D Tilt */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Card: AI Model Select */}
        <TiltCard maxTilt={5}>
          <div className="p-4 bg-[#0a0d14]/90 backdrop-blur-md border border-[#181d2a] hover:border-[#0091ff]/40 rounded-xl flex flex-col justify-between gap-3 h-full transition-colors duration-300">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Monitor size={16} className="text-[#64748b]" />
                <span className="text-sm font-semibold text-white">AI</span>
                <span className="text-sm text-[#64748b]">→</span>
                <select
                  value={config.aiModel}
                  onChange={(e) => {
                    playClick();
                    updateConfig('aiModel', e.target.value);
                  }}
                  className="flex-1 bg-[#141824] border border-[#202738] focus:border-[#0091ff] rounded px-2 py-1 text-xs text-white font-medium outline-none cursor-pointer transition-colors"
                >
                  <option value="BR-1">BR-1 (Apex / Fortnite)</option>
                  <option value="UNIVERSAL-V2">UNIVERSAL-V2 (All FPS)</option>
                  <option value="CS-VAL-1">CS-VAL-1 (Tactical)</option>
                  <option value="CUSTOM-ONNX">Custom .ONNX Neural Weights</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 pt-2">
                <span className="text-xs font-bold text-white tracking-wide">Information</span>
                <p className="text-xs text-[#64748b] leading-relaxed">
                  Engine active with high-precision convolutional bounding box regression and low-latency tensor pipelines.
                </p>
              </div>
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-[#22c55e] border border-[#22c55e]/40 bg-[#22c55e]/10 shadow-[0_0_8px_rgba(34,197,94,0.2)]">
                VERY GOOD ACCURACY
              </span>
            </div>
          </div>
        </TiltCard>

        {/* Right Card: Input & Runtime */}
        <TiltCard maxTilt={5}>
          <div className="p-4 bg-[#0a0d14]/90 backdrop-blur-md border border-[#181d2a] hover:border-[#0091ff]/40 rounded-xl flex flex-col gap-3 transition-colors duration-300">
            {/* Input Select */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs text-[#cbd5e1] font-medium">
                <Keyboard size={14} className="text-[#64748b]" />
                <span>Input</span>
              </div>
              <select
                value={config.inputMethod}
                onChange={(e) => {
                  playClick();
                  updateConfig('inputMethod', e.target.value);
                }}
                className="bg-[#141824] border border-[#202738] focus:border-[#0091ff] rounded px-2.5 py-1.5 text-xs text-white outline-none cursor-pointer transition-colors"
              >
                <option value="Software Based 1">Software Based 1</option>
                <option value="KMBox Net B+">KMBox Net B+</option>
                <option value="Arduino Leonardo">Arduino Leonardo</option>
              </select>
            </div>

            {/* Controller Select */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs text-[#cbd5e1] font-medium">
                <Gamepad2 size={14} className="text-[#64748b]" />
                <span>Controller</span>
              </div>
              <select
                value={config.controllerMethod}
                onChange={(e) => {
                  playClick();
                  updateConfig('controllerMethod', e.target.value);
                }}
                className="bg-[#141824] border border-[#202738] focus:border-[#0091ff] rounded px-2.5 py-1.5 text-xs text-white outline-none cursor-pointer transition-colors"
              >
                <option value="None">None</option>
                <option value="Xbox 360 / One">Xbox 360 / One</option>
                <option value="DualShock 4 / DualSense">DualShock 4 / DualSense</option>
              </select>
            </div>

            {/* Runtime Select */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-xs text-[#cbd5e1] font-medium">
                <FastForward size={14} className="text-[#64748b]" />
                <span>Runtime</span>
              </div>
              <select
                value={config.runtimeEngine}
                onChange={(e) => {
                  playClick();
                  updateConfig('runtimeEngine', e.target.value);
                }}
                className="bg-[#141824] border border-[#202738] focus:border-[#0091ff] rounded px-2.5 py-1.5 text-xs text-white outline-none cursor-pointer transition-colors"
              >
                <option value="ALTERNATIVE">ALTERNATIVE</option>
                <option value="CUDA TENSORRT">CUDA TENSORRT</option>
                <option value="DIRECTML HIGH">DIRECTML HIGH</option>
              </select>
            </div>
          </div>
        </TiltCard>
      </div>

      {/* Laser Conic Launch Button */}
      <div className="relative group p-[1.5px] rounded-xl overflow-hidden mt-1">
        {/* Animated Conic Laser Beam Border */}
        <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0091ff_0%,#38bdf8_50%,transparent_70%,#0091ff_100%)] opacity-80 group-hover:opacity-100 transition-opacity" />

        <motion.button
          type="button"
          onClick={handleLaunch}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full h-11 bg-[#0084ff] hover:bg-[#0073e6] text-white rounded-[10px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_25px_rgba(0,132,255,0.5)] z-10"
        >
          <motion.div
            animate={isLaunching ? { scale: [1, 1.4, 1], rotate: 360 } : {}}
            transition={{ duration: 0.4 }}
          >
            <Play size={18} fill="currentColor" />
          </motion.div>
          <span className="text-xs font-bold tracking-wider uppercase">
            {isLaunching ? 'Initializing Tensor Engine...' : 'Launch Raven AI'}
          </span>
        </motion.button>
      </div>
    </div>
  );
};
