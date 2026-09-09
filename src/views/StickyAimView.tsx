import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { ToggleSwitch } from '../components/Controls/ToggleSwitch';

export const StickyAimView: React.FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <div className="flex flex-col gap-4 px-6 py-3 animate-in fade-in duration-150">
      {/* Row 1: Sticky Aim Toggle */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-1.5 text-sm font-normal">
          <span className="text-[#cbd5e1]">Sticky Aim:</span>
          <span
            className={`font-medium ${
              config.stickyAimEnabled ? 'text-[#22c55e]' : 'text-[#ef4444]'
            }`}
          >
            {config.stickyAimEnabled ? 'ON' : 'OFF'}
          </span>
        </div>

        <ToggleSwitch
          checked={config.stickyAimEnabled}
          onChange={(val) => updateConfig('stickyAimEnabled', val)}
        />
      </div>

      {/* INFO Section - Exact Text from Nyron / Raven AI */}
      <div className="flex flex-col gap-2 pt-2 text-[#64748b] text-[13px] leading-relaxed select-text">
        <span className="font-bold text-[#e2e8f0] text-sm tracking-wide">INFO:</span>
        <p>
          This feature slows down your sensitivity while dragging your mouse over an enemy that has been recognized by the AI.
        </p>
        <p>
          Works similar to controller Aim Assist, perfect for legit players.
        </p>
        <p>
          Make sure to disable it if you are already using aimbot.
        </p>
      </div>
    </div>
  );
};
