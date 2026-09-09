import React from 'react';
import { Settings } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { ToggleSwitch } from '../components/Controls/ToggleSwitch';
import { SlotSelector } from '../components/Controls/SlotSelector';
import { SliderRow } from '../components/Controls/SliderRow';

export const TriggerbotView: React.FC = () => {
  const { config, updateConfig, setModalContent } = useConfig();

  const handleSelectSlot = (id: number) => {
    updateConfig('activeSlot', id);
    const slot = config.slots.find((s) => s.id === id);
    if (slot) {
      updateConfig('firstShotDelay', slot.firstShotDelay);
      updateConfig('shotDelay', slot.shotDelay);
    }
  };

  const handleToggleSlot = (id: number, enabled: boolean) => {
    const updatedSlots = config.slots.map((s) =>
      s.id === id ? { ...s, enabled } : s
    );
    updateConfig('slots', updatedSlots);
  };

  const openTriggerbotTuning = () => {
    setModalContent({
      title: 'Triggerbot Hitbox Configuration',
      component: (
        <div className="flex flex-col gap-3">
          <p>Select which entity hitboxes trigger automated shooting.</p>
          <div className="flex justify-between items-center py-1">
            <span>Hitbox: Head</span>
            <ToggleSwitch checked={true} onChange={() => {}} size="small" />
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Hitbox: Chest</span>
            <ToggleSwitch checked={true} onChange={() => {}} size="small" />
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Team Check:</span>
            <ToggleSwitch checked={true} onChange={() => {}} size="small" />
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="flex flex-col gap-3 px-6 py-2 animate-in fade-in duration-150">
      {/* Row 1: Triggerbot Toggle + Gear */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-1.5 text-sm font-normal">
          <span className="text-[#cbd5e1]">Triggerbot:</span>
          <span
            className={`font-medium ${
              config.triggerbotEnabled ? 'text-[#22c55e]' : 'text-[#64748b]'
            }`}
          >
            {config.triggerbotEnabled ? 'ON' : 'OFF'}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={openTriggerbotTuning}
            className="text-[#64748b] hover:text-[#cbd5e1] transition-colors cursor-pointer p-0.5"
            title="Triggerbot Settings"
          >
            <Settings size={15} />
          </button>
          <ToggleSwitch
            checked={config.triggerbotEnabled}
            onChange={(val) => updateConfig('triggerbotEnabled', val)}
          />
        </div>
      </div>

      {/* Row 2: Triggerbot Slot Configs */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Triggerbot Slot Configs</span>
        <ToggleSwitch
          checked={config.triggerbotSlotConfigsEnabled}
          onChange={(val) => updateConfig('triggerbotSlotConfigsEnabled', val)}
        />
      </div>

      {/* Row 3: Slot Selector */}
      <SlotSelector
        slots={config.slots}
        activeSlot={config.activeSlot}
        onSelectSlot={handleSelectSlot}
        onToggleSlot={handleToggleSlot}
      />

      {/* Row 4: First Shot Delay */}
      <SliderRow
        label="First Shot Delay"
        value={config.firstShotDelay}
        min={0}
        max={1000}
        step={1}
        unit="ms"
        onChange={(val) => {
          updateConfig('firstShotDelay', val);
          const updated = config.slots.map((s) =>
            s.id === config.activeSlot ? { ...s, firstShotDelay: val } : s
          );
          updateConfig('slots', updated);
        }}
      />

      {/* Row 5: Shot Delay */}
      <SliderRow
        label="Shot Delay"
        value={config.shotDelay}
        min={0}
        max={1000}
        step={1}
        unit="ms"
        onChange={(val) => {
          updateConfig('shotDelay', val);
          const updated = config.slots.map((s) =>
            s.id === config.activeSlot ? { ...s, shotDelay: val } : s
          );
          updateConfig('slots', updated);
        }}
      />

      {/* Row 6: Enable Keybind */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Enable Keybind</span>
        <ToggleSwitch
          checked={config.enableKeybind}
          onChange={(val) => updateConfig('enableKeybind', val)}
        />
      </div>
    </div>
  );
};
