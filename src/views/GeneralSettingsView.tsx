import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { ToggleSwitch } from '../components/Controls/ToggleSwitch';
import { TooltipHelp } from '../components/Controls/TooltipHelp';
import { KeybindBadge } from '../components/Controls/KeybindBadge';
import type { CaptureMethod } from '../types/config';

const CAPTURE_METHODS: CaptureMethod[] = [
  'GDI Capture',
  'DXGI Capture',
  'NDI Stream',
  'Capture Card',
];

export const GeneralSettingsView: React.FC = () => {
  const { config, updateConfig } = useConfig();

  return (
    <div className="flex flex-col gap-2 px-6 py-1.5 animate-in fade-in duration-150">
      {/* Row 1: Capture Engine Radio Group */}
      <div className="flex items-center gap-3.5 py-1.5 overflow-x-hidden">
        {CAPTURE_METHODS.map((method) => {
          const isSelected = config.captureMethod === method;
          return (
            <div
              key={method}
              onClick={() => updateConfig('captureMethod', method)}
              className="flex items-center gap-1.5 cursor-pointer select-none group shrink-0"
            >
              <div
                className={`w-3.5 h-3.5 rounded-full transition-all flex items-center justify-center ${
                  isSelected
                    ? 'bg-[#0091ff] shadow-[0_0_6px_rgba(0,145,255,0.6)]'
                    : 'bg-[#1a1f2c] group-hover:bg-[#252c3d]'
                }`}
              />
              <span
                className={`text-[13px] tracking-wide transition-colors ${
                  isSelected
                    ? 'text-white font-medium'
                    : 'text-[#64748b] group-hover:text-[#94a3b8]'
                }`}
              >
                {method}
              </span>
            </div>
          );
        })}
      </div>

      {/* DXGI Hardware Direct GPU Status Badge */}
      {config.captureMethod === 'DXGI Capture' && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e1422] border border-[#1b263e] text-[11px] font-mono text-[#38bdf8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping" />
          <span>DXGI 1.2 OutputDuplication: Direct GPU Framebuffer (0.38ms Latency, 240 FPS Target)</span>
        </div>
      )}

      {/* Row 2: Multithreading */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center">
          <span className="text-sm font-normal text-[#cbd5e1]">Multithreading (added back soon)</span>
          <TooltipHelp text="Distributes neural network inference across multiple CPU worker threads." />
        </div>
        <ToggleSwitch
          checked={config.multithreadingEnabled}
          onChange={(val) => updateConfig('multithreadingEnabled', val)}
        />
      </div>

      {/* Row 3: Reduce System Usage */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center">
          <span className="text-sm font-normal text-[#cbd5e1]">Reduce System Usage (added back soon)</span>
          <TooltipHelp text="Dynamically throttles capture rate when no enemies are in detection range." />
        </div>
        <ToggleSwitch
          checked={config.reduceSystemUsageEnabled}
          onChange={(val) => updateConfig('reduceSystemUsageEnabled', val)}
        />
      </div>

      {/* Row 4: Discord RPC */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center">
          <span className="text-sm font-normal text-[#cbd5e1]">Discord RPC</span>
          <TooltipHelp text="Displays Raven AI game status on your Discord profile." />
        </div>
        <ToggleSwitch
          checked={config.discordRpcEnabled}
          onChange={(val) => updateConfig('discordRpcEnabled', val)}
        />
      </div>

      {/* Row 5: Tournament Mode */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center">
          <span className="text-sm font-normal text-[#cbd5e1]">Tournament Mode</span>
          <TooltipHelp text="Disables visible ESP overlays and locks maximum smoothing for strict LAN/scrim play." />
        </div>
        <ToggleSwitch
          checked={config.tournamentModeEnabled}
          onChange={(val) => updateConfig('tournamentModeEnabled', val)}
        />
      </div>

      {/* Row 6: Enable Square FOV */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Enable Square FOV</span>
        <ToggleSwitch
          checked={config.enableSquareFov}
          onChange={(val) => updateConfig('enableSquareFov', val)}
        />
      </div>

      {/* Row 7: Capture Kmbox Keystrokes */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Capture Kmbox Keystrokes</span>
        <ToggleSwitch
          checked={config.captureKmboxKeystrokes}
          onChange={(val) => updateConfig('captureKmboxKeystrokes', val)}
        />
      </div>

      {/* Row 8: Kill Switch */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Kill Switch</span>
        <KeybindBadge
          value={config.killSwitchKeybind}
          onChange={(k) => updateConfig('killSwitchKeybind', k)}
        />
      </div>
    </div>
  );
};
