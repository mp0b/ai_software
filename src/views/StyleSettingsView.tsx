import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { useMotion } from '../motion/MotionContext';
import { SliderRow } from '../components/Controls/SliderRow';
import { ColorBox } from '../components/Controls/ColorBox';
import { ToggleSwitch } from '../components/Controls/ToggleSwitch';
import { Volume2, Sparkles, Wand2, Gauge } from 'lucide-react';
import type { ParticlesMode, AnimationSpeed } from '../motion/MotionContext';

export const StyleSettingsView: React.FC = () => {
  const { config, updateConfig } = useConfig();
  const {
    soundEnabled,
    setSoundEnabled,
    soundVolume,
    setSoundVolume,
    particlesMode,
    setParticlesMode,
    mouseAuraEnabled,
    setMouseAuraEnabled,
    tilt3DEnabled,
    setTilt3DEnabled,
    animationSpeed,
    setAnimationSpeed,
  } = useMotion();

  return (
    <div className="flex flex-col gap-3 px-6 py-1 select-none overflow-y-auto max-h-[380px] custom-scrollbar">
      {/* Authentic Nyron Style Sliders */}
      <SliderRow
        label="Blur"
        value={config.uiBlur}
        min={0}
        max={10}
        step={0.01}
        formatDecimals={3}
        onChange={(val) => updateConfig('uiBlur', val)}
      />

      <SliderRow
        label="Rounding"
        value={config.uiRounding}
        min={0}
        max={40}
        step={0.1}
        formatDecimals={3}
        onChange={(val) => updateConfig('uiRounding', val)}
      />

      {/* UI Color row */}
      <div className="flex items-center gap-3 py-1 border-b border-[#181d2a]/60 pb-3">
        <ColorBox
          color={config.uiColor}
          onChange={(c) => updateConfig('uiColor', c)}
        />
        <span className="text-sm font-normal text-[#cbd5e1]">UI Color</span>
      </div>

      {/* --- CUSTOM MOTION ENGINE SECTION --- */}
      <div className="pt-2 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#0091ff]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Raven Motion Engine
          </span>
        </div>

        {/* Sound FX Toggle & Volume */}
        <div className="p-3 bg-[#0a0d14] border border-[#161a25] rounded-xl flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 size={15} className="text-[#64748b]" />
              <span className="text-xs font-semibold text-[#e2e8f0]">Procedural Audio Synth</span>
            </div>
            <ToggleSwitch checked={soundEnabled} onChange={setSoundEnabled} size="small" />
          </div>

          {soundEnabled && (
            <SliderRow
              label="Synth Volume"
              value={Math.round(soundVolume * 100)}
              min={0}
              max={100}
              unit="%"
              onChange={(val) => setSoundVolume(val / 100)}
            />
          )}
        </div>

        {/* Particles & Interactive FX Mode */}
        <div className="p-3 bg-[#0a0d14] border border-[#161a25] rounded-xl flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wand2 size={15} className="text-[#64748b]" />
              <span className="text-xs font-semibold text-[#e2e8f0]">Particle Constellation</span>
            </div>
            <div className="flex items-center gap-1 bg-[#141824] p-0.5 rounded-lg border border-[#202738]">
              {(['cyber', 'quantum', 'off'] as ParticlesMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setParticlesMode(mode)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                    particlesMode === mode
                      ? 'bg-[#0084ff] text-white shadow-[0_0_8px_rgba(0,132,255,0.4)]'
                      : 'text-[#64748b] hover:text-[#cbd5e1]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-[#181d2a]/50">
            <span className="text-xs text-[#94a3b8]">Mouse Aura Glow</span>
            <ToggleSwitch checked={mouseAuraEnabled} onChange={setMouseAuraEnabled} size="small" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-[#94a3b8]">3D Card Perspective Tilt</span>
            <ToggleSwitch checked={tilt3DEnabled} onChange={setTilt3DEnabled} size="small" />
          </div>
        </div>

        {/* Animation Physics Speed */}
        <div className="p-3 bg-[#0a0d14] border border-[#161a25] rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge size={15} className="text-[#64748b]" />
            <span className="text-xs font-semibold text-[#e2e8f0]">Physics Spring Speed</span>
          </div>

          <div className="flex items-center gap-1 bg-[#141824] p-0.5 rounded-lg border border-[#202738]">
            {(['smooth', 'normal', 'turbo'] as AnimationSpeed[]).map((speed) => (
              <button
                key={speed}
                type="button"
                onClick={() => setAnimationSpeed(speed)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                  animationSpeed === speed
                    ? 'bg-[#0084ff] text-white shadow-[0_0_8px_rgba(0,132,255,0.4)]'
                    : 'text-[#64748b] hover:text-[#cbd5e1]'
                }`}
              >
                {speed}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
