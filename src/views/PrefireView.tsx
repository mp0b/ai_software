import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { ToggleSwitch } from '../components/Controls/ToggleSwitch';
import { KeybindBadge } from '../components/Controls/KeybindBadge';

export const PrefireView: React.FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <div className="flex flex-col gap-4 px-6 py-3 animate-in fade-in duration-150">
      {/* Row 1: Wall Prefirebot Toggle */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-1.5 text-sm font-normal">
          <span className="text-[#cbd5e1]">Wall Prefirebot:</span>
          <span
            className={`font-medium ${
              config.wallPrefirebotEnabled ? 'text-[#22c55e]' : 'text-[#64748b]'
            }`}
          >
            {config.wallPrefirebotEnabled ? 'ON' : 'OFF'}
          </span>
        </div>

        <ToggleSwitch
          checked={config.wallPrefirebotEnabled}
          onChange={(val) => updateConfig('wallPrefirebotEnabled', val)}
        />
      </div>

      {/* Row 2: Shotgun Keybind */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Shotgun Keybind</span>
        <KeybindBadge
          value={config.shotgunKeybind}
          onChange={(key) => updateConfig('shotgunKeybind', key)}
        />
      </div>
    </div>
  );
};
