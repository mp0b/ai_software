import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { SliderRow } from '../components/Controls/SliderRow';
import { KeybindBadge } from '../components/Controls/KeybindBadge';

export const GameSettingsView: React.FC = () => {
  const { config, updateConfig } = useConfig();

  const updateSlotBind = (slot: keyof typeof config.slotBinds, key: string) => {
    updateConfig('slotBinds', {
      ...config.slotBinds,
      [slot]: key,
    });
  };

  return (
    <div className="flex flex-col gap-3 px-6 py-2 animate-in fade-in duration-150">
      <span className="font-semibold text-white text-sm tracking-wide">Ingame Sensitivity:</span>

      {/* Sensitivity Slider */}
      <SliderRow
        label="Sensitivity"
        tooltipText="Your in-game primary mouse sensitivity multiplier."
        value={config.sensitivity}
        min={0.1}
        max={50}
        step={0.001}
        formatDecimals={3}
        onChange={(val) => updateConfig('sensitivity', val)}
      />

      {/* ADS Sensitivity Slider */}
      <SliderRow
        label="ADS Sensitivity"
        tooltipText="Sensitivity applied when aiming down sights (right mouse button held)."
        value={config.adsSensitivity}
        min={0.1}
        max={100}
        step={0.001}
        formatDecimals={3}
        onChange={(val) => updateConfig('adsSensitivity', val)}
      />

      <span className="font-semibold text-white text-sm tracking-wide mt-2">Weapon Slots:</span>

      {/* Weapon slot binds in row */}
      <div className="grid grid-cols-5 gap-3 py-1">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#cbd5e1]">Slot 1</span>
          <KeybindBadge
            value={config.slotBinds.slot1}
            onChange={(k) => updateSlotBind('slot1', k)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#cbd5e1]">Slot 2</span>
          <KeybindBadge
            value={config.slotBinds.slot2}
            onChange={(k) => updateSlotBind('slot2', k)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#cbd5e1]">Slot 3</span>
          <KeybindBadge
            value={config.slotBinds.slot3}
            onChange={(k) => updateSlotBind('slot3', k)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#cbd5e1]">Slot 4</span>
          <KeybindBadge
            value={config.slotBinds.slot4}
            onChange={(k) => updateSlotBind('slot4', k)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#cbd5e1]">Slot 5</span>
          <KeybindBadge
            value={config.slotBinds.slot5}
            onChange={(k) => updateSlotBind('slot5', k)}
          />
        </div>
      </div>

      {/* Knife Bind */}
      <div className="flex flex-col gap-1.5 w-24 py-1">
        <span className="text-xs text-[#cbd5e1]">Knife</span>
        <KeybindBadge
          value={config.slotBinds.knife}
          onChange={(k) => updateSlotBind('knife', k)}
        />
      </div>
    </div>
  );
};
