import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { ToggleSwitch } from '../components/Controls/ToggleSwitch';
import { TargetBoneSelector } from '../components/Controls/TargetBoneSelector';
import { SliderRow } from '../components/Controls/SliderRow';
import type { TargetBone } from '../types/config';

export const WeaponSlotsView: React.FC = () => {
  const { config, updateConfig, setModalContent } = useConfig();
  const currentSlotId = config.weaponActiveSlot;
  const currentSlot = config.weaponSlotsState[currentSlotId] || {
    enabled: true,
    targetBone: 'Neck' as TargetBone,
    strength: 70.0,
    fov: 250,
  };

  const updateCurrentSlot = (partial: Partial<typeof currentSlot>) => {
    updateConfig('weaponSlotsState', {
      ...config.weaponSlotsState,
      [currentSlotId]: {
        ...currentSlot,
        ...partial,
      },
    });
  };

  const openWeaponTuning = () => {
    setModalContent({
      title: 'Weapon Slot Recoil & Pattern',
      component: (
        <div className="flex flex-col gap-3">
          <p>Configure spray control pattern compensation for Slot {currentSlotId}.</p>
          <div className="flex justify-between items-center py-1">
            <span>Pattern Decay Rate:</span>
            <span className="text-white font-mono bg-[#181c28] px-2 py-0.5 rounded">Adaptive 1.2x</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Auto Cycle Profile:</span>
            <ToggleSwitch checked={true} onChange={() => {}} size="small" />
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="flex flex-col gap-3.5 px-6 py-2 animate-in fade-in duration-150">
      {/* Row 1: 5 Slots with Mini Toggles and Color State */}
      <div className="flex items-center gap-2.5 my-1">
        {[1, 2, 3, 4, 5].map((id) => {
          const slot = config.weaponSlotsState[id] || { enabled: id <= 3 };
          const isActive = config.weaponActiveSlot === id;

          return (
            <div
              key={id}
              onClick={() => updateConfig('weaponActiveSlot', id)}
              className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-all select-none ${
                isActive
                  ? 'border-2 border-[#0084ff] bg-[#0c1017] shadow-[0_0_12px_rgba(0,132,255,0.25)]'
                  : 'border border-[#171b26] bg-[#12151e] hover:bg-[#181c28]'
              }`}
            >
              <span
                className={`text-xs font-semibold tracking-wide ${
                  slot.enabled ? 'text-[#22c55e]' : 'text-[#ef4444]'
                }`}
              >
                Slot {id}
              </span>

              {isActive && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    updateCurrentSlot({ enabled: !slot.enabled });
                  }}
                >
                  <ToggleSwitch
                    size="small"
                    checked={slot.enabled}
                    onChange={(enabled) => updateCurrentSlot({ enabled })}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Row 2: Target Bone Radio Group */}
      <TargetBoneSelector
        selected={currentSlot.targetBone}
        onChange={(bone) => updateCurrentSlot({ targetBone: bone })}
      />

      {/* Row 3: Strength Slider */}
      <SliderRow
        label="Strength"
        value={currentSlot.strength}
        min={0}
        max={100}
        step={0.5}
        unit="%"
        formatDecimals={1}
        hasGear={true}
        onGearClick={openWeaponTuning}
        onChange={(val) => updateCurrentSlot({ strength: val })}
      />

      {/* Row 4: FOV Slider */}
      <SliderRow
        label="FOV"
        value={currentSlot.fov}
        min={10}
        max={500}
        step={1}
        unit="px"
        hasGear={true}
        onChange={(val) => updateCurrentSlot({ fov: val })}
      />

      {/* Row 5: Prediction [Beta] Slider + Toggle */}
      <div className="flex flex-col gap-1.5 py-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#cbd5e1] font-normal tracking-wide">Prediction [Beta]</span>
          <div className="flex items-center gap-3">
            <span className="text-[#cbd5e1] font-normal tracking-wide">{config.predictionBetaValue}</span>
            <ToggleSwitch
              checked={config.predictionBetaEnabled}
              onChange={(val) => updateConfig('predictionBetaEnabled', val)}
            />
          </div>
        </div>

        <div className="relative flex items-center w-full h-4">
          <input
            type="range"
            min={0}
            max={2500}
            step={1}
            value={config.predictionBetaValue}
            onChange={(e) => updateConfig('predictionBetaValue', parseInt(e.target.value, 10))}
            className="w-full h-1 rounded-full cursor-pointer appearance-none outline-none"
            style={{
              background: `linear-gradient(to right, #0091ff 0%, #0091ff ${(config.predictionBetaValue / 2500) * 100}%, #181c26 ${(config.predictionBetaValue / 2500) * 100}%, #181c26 100%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
