import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { ToggleSwitch } from '../components/Controls/ToggleSwitch';
import { SliderRow } from '../components/Controls/SliderRow';

export const RCSView: React.FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <div className="flex flex-col gap-4 px-6 py-3 animate-in fade-in duration-150">
      {/* Row 1: Anti Recoil */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-1.5 text-sm font-normal">
          <span className="text-[#cbd5e1]">Anti Recoil:</span>
          <span
            className={`font-medium ${
              config.antiRecoilEnabled ? 'text-[#22c55e]' : 'text-[#64748b]'
            }`}
          >
            {config.antiRecoilEnabled ? 'ON' : 'OFF'}
          </span>
        </div>

        <ToggleSwitch
          checked={config.antiRecoilEnabled}
          onChange={(val) => updateConfig('antiRecoilEnabled', val)}
        />
      </div>

      {/* Row 2: Recoil Slot Configs */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Recoil Slot Configs</span>
        <ToggleSwitch
          checked={config.recoilSlotConfigsEnabled}
          onChange={(val) => updateConfig('recoilSlotConfigsEnabled', val)}
        />
      </div>

      {/* Row 3: Global Recoil Strength */}
      <SliderRow
        label="Global Recoil Strength"
        value={config.globalRecoilStrength}
        min={0}
        max={100}
        step={1}
        onChange={(val) => updateConfig('globalRecoilStrength', val)}
      />
    </div>
  );
};
