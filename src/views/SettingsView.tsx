import React from 'react';
import { ToggleSwitch } from '../components/Controls/ToggleSwitch';
import { useConfig } from '../context/ConfigContext';

export const SettingsView: React.FC = () => {
  const { config } = useConfig();

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "nyron_config.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleReset = () => {
    if (confirm("Reset all settings to default factory values?")) {
      localStorage.removeItem('nyron_config');
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col gap-3.5 px-6 py-2 animate-in fade-in duration-150">
      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Streamproof (OBS / Discord bypass)</span>
        <ToggleSwitch checked={true} onChange={() => {}} />
      </div>

      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Discord Rich Presence (RPC)</span>
        <ToggleSwitch checked={false} onChange={() => {}} />
      </div>

      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Run on System Startup</span>
        <ToggleSwitch checked={false} onChange={() => {}} />
      </div>

      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-normal text-[#cbd5e1]">Hardware Acceleration</span>
        <ToggleSwitch checked={true} onChange={() => {}} />
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-[#181d2a]">
        <button
          type="button"
          onClick={handleExport}
          className="flex-1 py-2 rounded-md bg-[#131722] hover:bg-[#1a2030] text-[#cbd5e1] border border-[#232a3b] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
        >
          Export Profile JSON
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 rounded-md bg-[#251317] hover:bg-[#35181e] text-[#ef4444] border border-[#401820] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
        >
          Reset Defaults
        </button>
      </div>
    </div>
  );
};
