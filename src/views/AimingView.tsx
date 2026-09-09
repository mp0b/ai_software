import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { ToggleSwitch } from '../components/Controls/ToggleSwitch';
import { TargetBoneSelector } from '../components/Controls/TargetBoneSelector';
import { SliderRow } from '../components/Controls/SliderRow';
import { KeybindBadge } from '../components/Controls/KeybindBadge';

export const AimingView: React.FC = () => {
  const { config, updateConfig, setModalContent } = useConfig();

  const openAimingTuning = () => {
    setModalContent({
      title: 'Aiming Advanced Tuning',
      component: (
        <div className="flex flex-col gap-3">
          <p>Fine-tune target tracking curves and acceleration parameters.</p>
          <div className="flex justify-between items-center py-1">
            <span>Curve Algorithm:</span>
            <span className="text-white font-mono bg-[#181c28] px-2 py-0.5 rounded">Bezier Quadratic</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Dynamic Smoothing:</span>
            <ToggleSwitch checked={true} onChange={() => {}} size="small" />
          </div>
        </div>
      ),
    });
  };

  const openFovTuning = () => {
    setModalContent({
      title: 'FOV Radius Settings',
      component: (
        <div className="flex flex-col gap-3">
          <p>Customize FOV shape and border rendering.</p>
          <div className="flex justify-between items-center py-1">
            <span>FOV Shape:</span>
            <span className="text-white font-mono bg-[#181c28] px-2 py-0.5 rounded">Circle (Standard)</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Dynamic FOV scaling:</span>
            <ToggleSwitch checked={false} onChange={() => {}} size="small" />
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="flex flex-col gap-3.5 px-6 py-2 animate-in fade-in duration-150">
      {/* Row 1: Aimbot Toggle */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-1.5 text-sm font-normal">
          <span className="text-[#cbd5e1]">Aimbot:</span>
          <span
            className={`font-medium ${
              config.aimbotEnabled ? 'text-[#22c55e]' : 'text-[#64748b]'
            }`}
          >
            {config.aimbotEnabled ? 'ON' : 'OFF'}
          </span>
        </div>

        <ToggleSwitch
          checked={config.aimbotEnabled}
          onChange={(val) => updateConfig('aimbotEnabled', val)}
        />
      </div>

      {/* Row 2: Target Bone Radio Group */}
      <TargetBoneSelector
        selected={config.targetBone}
        onChange={(bone) => updateConfig('targetBone', bone)}
      />

      {/* Row 3: Strength Slider */}
      <SliderRow
        label="Strength"
        value={config.strength}
        min={0}
        max={100}
        step={0.5}
        unit="%"
        formatDecimals={1}
        hasGear={true}
        onGearClick={openAimingTuning}
        onChange={(val) => updateConfig('strength', val)}
      />

      {/* Row 4: FOV Slider */}
      <SliderRow
        label="FOV"
        value={config.fov}
        min={10}
        max={500}
        step={1}
        unit="px"
        hasGear={true}
        onGearClick={openFovTuning}
        onChange={(val) => updateConfig('fov', val)}
      />

      {/* Row 5: Auto Aim Toggle */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Auto Aim</span>
        <ToggleSwitch
          checked={config.autoAimEnabled}
          onChange={(val) => updateConfig('autoAimEnabled', val)}
        />
      </div>

      {/* Row 6: Keybind */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Keybind</span>
        <KeybindBadge
          value={config.keybind}
          onChange={(key) => updateConfig('keybind', key)}
        />
      </div>

      {/* Row 7: Backup Keybind */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Backup Keybind</span>
        <KeybindBadge
          value={config.backupKeybind}
          onChange={(key) => updateConfig('backupKeybind', key)}
        />
      </div>
    </div>
  );
};
