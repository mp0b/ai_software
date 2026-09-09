import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { SliderRow } from '../components/Controls/SliderRow';
import { ToggleSwitch } from '../components/Controls/ToggleSwitch';
import { OnnxModelLoader } from '../components/Controls/OnnxModelLoader';

export const AISettingsView: React.FC = () => {
  const { config, updateConfig } = useConfig();

  const blobSizes: (128 | 256 | 416)[] = [128, 256, 416];

  return (
    <div className="flex flex-col gap-3 px-6 py-2 animate-in fade-in duration-150 overflow-y-auto max-h-[380px] custom-scrollbar">
      {/* Real ONNX Neural Model Loader & Inspector */}
      <OnnxModelLoader />

      {/* Confidence Slider */}
      <SliderRow
        label="Confidence"
        tooltipText="Minimum detection confidence required for an entity to be acknowledged by the AI."
        value={config.aiConfidence}
        min={0.1}
        max={1.0}
        step={0.001}
        formatDecimals={3}
        onChange={(val) => updateConfig('aiConfidence', val)}
      />

      {/* NMS Slider */}
      <SliderRow
        label="NMS"
        tooltipText="Non-Maximum Suppression threshold to discard overlapping redundant detection boxes."
        value={config.aiNms}
        min={0.05}
        max={0.9}
        step={0.001}
        formatDecimals={3}
        onChange={(val) => updateConfig('aiNms', val)}
      />

      {/* Blob Size Selector */}
      <div className="flex flex-col gap-1.5 py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Blob Size (automatically adjusted)</span>
        <div className="flex items-center gap-6 py-1">
          {blobSizes.map((size) => {
            const isSelected = config.blobSize === size;
            return (
              <div
                key={size}
                onClick={() => updateConfig('blobSize', size)}
                className="flex items-center gap-2 cursor-pointer select-none group"
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full transition-all flex items-center justify-center ${
                    isSelected
                      ? 'bg-[#0091ff] shadow-[0_0_6px_rgba(0,145,255,0.6)]'
                      : 'bg-[#1a1f2c] group-hover:bg-[#252c3d]'
                  }`}
                />
                <span
                  className={`text-sm tracking-wide transition-colors ${
                    isSelected
                      ? 'text-white font-medium'
                      : 'text-[#64748b] group-hover:text-[#94a3b8]'
                  }`}
                >
                  {size}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Show AI Window Toggle */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Show AI Window (takes performance)</span>
        <ToggleSwitch
          checked={config.showAiWindow}
          onChange={(val) => updateConfig('showAiWindow', val)}
        />
      </div>
    </div>
  );
};
