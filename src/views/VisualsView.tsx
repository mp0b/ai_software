import React from 'react';
import { Settings } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { ToggleSwitch } from '../components/Controls/ToggleSwitch';
import { KeybindBadge } from '../components/Controls/KeybindBadge';
import { ColorBox } from '../components/Controls/ColorBox';
import { TooltipHelp } from '../components/Controls/TooltipHelp';

export const VisualsView: React.FC = () => {
  const { config, updateConfig, setModalContent } = useConfig();

  const openOverlaySettings = () => {
    setModalContent({
      title: 'DirectX / Vulkan Overlay Hooks',
      component: (
        <div className="flex flex-col gap-3">
          <p>Configure hardware-accelerated transparent overlay mode.</p>
          <div className="flex justify-between items-center py-1">
            <span>Renderer:</span>
            <span className="text-white font-mono bg-[#181c28] px-2 py-0.5 rounded">DirectX 11 Hook</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>VSync Refresh:</span>
            <ToggleSwitch checked={true} onChange={() => {}} size="small" />
          </div>
        </div>
      ),
    });
  };

  const openBoxSettings = () => {
    setModalContent({
      title: 'Bounding Box ESP Settings',
      component: (
        <div className="flex flex-col gap-3">
          <p>Customize ESP box style, corner radius and thickness.</p>
          <div className="flex justify-between items-center py-1">
            <span>Box Style:</span>
            <span className="text-white font-mono bg-[#181c28] px-2 py-0.5 rounded">Corner Bracket</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span>Border Thickness:</span>
            <span className="text-white font-mono bg-[#181c28] px-2 py-0.5 rounded">1.5 px</span>
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="flex flex-col gap-2.5 px-6 py-1.5 animate-in fade-in duration-150">
      {/* Row 1: Overlay (Risky!) */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center">
          <span className="text-sm font-normal text-[#cbd5e1]">Overlay (Risky!):</span>
          <TooltipHelp text="Drawing overlays directly in game memory can trigger advanced anti-cheat heuristics. Use streamproof mode." />
          <span
            className={`ml-1.5 text-sm font-medium ${
              config.overlayRiskyEnabled ? 'text-[#22c55e]' : 'text-[#64748b]'
            }`}
          >
            {config.overlayRiskyEnabled ? 'ON' : 'OFF'}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={openOverlaySettings}
            className="text-[#64748b] hover:text-[#cbd5e1] transition-colors cursor-pointer p-0.5"
            title="Overlay settings"
          >
            <Settings size={15} />
          </button>
          <ToggleSwitch
            checked={config.overlayRiskyEnabled}
            onChange={(val) => updateConfig('overlayRiskyEnabled', val)}
          />
        </div>
      </div>

      {/* Row 2: Show/Hide Menu */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Show/Hide Menu</span>
        <KeybindBadge
          value={config.showHideMenuKeybind}
          onChange={(key) => updateConfig('showHideMenuKeybind', key)}
        />
      </div>

      {/* Row 3: Show Info */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Show Info</span>
        <ToggleSwitch
          checked={config.showInfoEnabled}
          onChange={(val) => updateConfig('showInfoEnabled', val)}
        />
      </div>

      {/* Row 4: Show FOV */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Show FOV</span>
        <div className="flex items-center gap-3">
          <ColorBox
            color={config.showFovColor}
            onChange={(c) => updateConfig('showFovColor', c)}
          />
          <ToggleSwitch
            checked={config.showFovEnabled}
            onChange={(val) => updateConfig('showFovEnabled', val)}
          />
        </div>
      </div>

      {/* Row 5: Show Crosshair */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Show Crosshair</span>
        <div className="flex items-center gap-3">
          <ColorBox
            color={config.showCrosshairColor}
            onChange={(c) => updateConfig('showCrosshairColor', c)}
          />
          <ToggleSwitch
            checked={config.showCrosshairEnabled}
            onChange={(val) => updateConfig('showCrosshairEnabled', val)}
          />
        </div>
      </div>

      {/* Row 6: Show Box */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Show Box</span>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={openBoxSettings}
            className="text-[#64748b] hover:text-[#cbd5e1] transition-colors cursor-pointer p-0.5"
            title="Box settings"
          >
            <Settings size={15} />
          </button>
          <ToggleSwitch
            checked={config.showBoxEnabled}
            onChange={(val) => updateConfig('showBoxEnabled', val)}
          />
        </div>
      </div>

      {/* Row 7: Show Line */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Show Line</span>
        <div className="flex items-center gap-3">
          <ColorBox
            color={config.showLineColor}
            onChange={(c) => updateConfig('showLineColor', c)}
          />
          <ToggleSwitch
            checked={config.showLineEnabled}
            onChange={(val) => updateConfig('showLineEnabled', val)}
          />
        </div>
      </div>

      {/* Row 8: Show Point */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Show Point</span>
        <div className="flex items-center gap-3">
          <ColorBox
            color={config.showPointColor}
            onChange={(c) => updateConfig('showPointColor', c)}
          />
          <ToggleSwitch
            checked={config.showPointEnabled}
            onChange={(val) => updateConfig('showPointEnabled', val)}
          />
        </div>
      </div>

      {/* Row 9: Show Confidence */}
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Show Confidence</span>
        <div className="flex items-center gap-3">
          <ColorBox
            color={config.showConfidenceColor}
            onChange={(c) => updateConfig('showConfidenceColor', c)}
          />
          <ToggleSwitch
            checked={config.showConfidenceEnabled}
            onChange={(val) => updateConfig('showConfidenceEnabled', val)}
          />
        </div>
      </div>
    </div>
  );
};
