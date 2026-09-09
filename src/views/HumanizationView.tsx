import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { ToggleSwitch } from '../components/Controls/ToggleSwitch';
import { SliderRow } from '../components/Controls/SliderRow';
import { TooltipHelp } from '../components/Controls/TooltipHelp';

export const HumanizationView: React.FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <div className="flex flex-col gap-3 px-6 py-2 animate-in fade-in duration-150">
      {/* Row 1: Progressive Slowdown */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center">
          <span className="text-sm font-normal text-[#cbd5e1]">Progressive Slowdown</span>
          <TooltipHelp text="Gradually reduces mouse cursor speed as crosshair approaches target bone to simulate natural human deceleration." />
        </div>
        <ToggleSwitch
          checked={config.progressiveSlowdownEnabled}
          onChange={(val) => updateConfig('progressiveSlowdownEnabled', val)}
        />
      </div>

      {/* Row 2: Value */}
      <SliderRow
        label="Value"
        value={config.progressiveSlowdownValue}
        min={50}
        max={1000}
        step={10}
        onChange={(val) => updateConfig('progressiveSlowdownValue', val)}
      />

      {/* Row 3: Target Switch Delay */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Target Switch Delay</span>
        <ToggleSwitch
          checked={config.targetSwitchDelayEnabled}
          onChange={(val) => updateConfig('targetSwitchDelayEnabled', val)}
        />
      </div>

      {/* Row 4: Delay */}
      <SliderRow
        label="Delay"
        value={config.targetSwitchDelayValue}
        min={0}
        max={1000}
        step={10}
        unit="ms"
        onChange={(val) => updateConfig('targetSwitchDelayValue', val)}
      />

      {/* Row 5: Deadzone */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Deadzone</span>
        <ToggleSwitch
          checked={config.deadzoneEnabled}
          onChange={(val) => updateConfig('deadzoneEnabled', val)}
        />
      </div>

      {/* Row 6: FOV (?) */}
      <SliderRow
        label="FOV"
        tooltipText="Radius in pixels where aimbot pauses micro-adjustments once crosshair is directly on target."
        value={config.deadzoneFov}
        min={0}
        max={20}
        step={1}
        unit="px"
        onChange={(val) => updateConfig('deadzoneFov', val)}
      />
    </div>
  );
};
