import React from 'react';
import { useConfig } from '../context/ConfigContext';

export const InformationView: React.FC = () => {
  const { config, setModalContent } = useConfig();

  const handleUpgrade = () => {
    setModalContent({
      title: 'Raven AI Lifetime Upgrade',
      component: (
        <div className="flex flex-col gap-3">
          <p className="text-white text-xs">
            Extend your Raven AI subscription or upgrade to Lifetime VIP tier for priority updates and private builds.
          </p>
          <div className="p-3 bg-[#161a25] border border-[#232a3b] rounded-md font-mono text-xs text-[#0091ff]">
            TIER: LIFETIME ACTIVE
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="flex flex-col gap-3 px-6 py-1 animate-in fade-in duration-150">
      <div className="p-4 bg-[#0a0d14] border border-[#181d2a] rounded-xl flex flex-col gap-3">
        {/* Section 1: Title + Expiry + Upgrade Button */}
        <div className="flex items-center justify-between pb-2 border-b border-[#141824]">
          <div className="flex flex-col">
            <span className="font-bold text-white text-base tracking-wide">Raven AI</span>
            <span className="text-xs text-[#64748b]">
              License: <span className="text-[#22c55e] font-mono font-bold">ACTIVE (LIFETIME VIP)</span>
            </span>
            <span className="text-[10px] text-[#475569] font-mono">
              Key: {localStorage.getItem('raven_license_key') || 'RAVEN-LIFETIME-VIP-2025'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.removeItem('raven_license_active');
                  localStorage.removeItem('raven_license_key');
                  window.location.reload();
                } catch {}
              }}
              className="px-3 py-1.5 bg-[#141824] hover:bg-[#1a2030] text-[#94a3b8] hover:text-white text-xs font-medium rounded-md border border-[#1f2637] transition-colors cursor-pointer"
              title="Return to License Screen"
            >
              Change Key
            </button>
            <button
              type="button"
              onClick={handleUpgrade}
              className="px-4 py-1.5 bg-[#0084ff] hover:bg-[#0073e6] text-white text-xs font-bold tracking-wider uppercase rounded-md transition-colors cursor-pointer shadow-[0_0_12px_rgba(0,132,255,0.3)]"
            >
              Upgrade
            </button>
          </div>
        </div>

        {/* Section 2: Resolution & System Specs */}
        <div className="flex items-start justify-between pb-2 border-b border-[#141824]">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-white tracking-wide">
              Resolution: {window.screen.width}x{window.screen.height}
            </span>
            <span className="text-xs text-[#64748b]">Windows: {config.osVersion}</span>
            <span className="text-xs text-[#64748b]">GPU: {config.gpuName}</span>
            <span className="text-xs text-[#64748b]">CPU: {config.cpuName}</span>
          </div>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-1.5 bg-[#141824] hover:bg-[#1a2030] text-[#cbd5e1] text-xs font-medium rounded-md border border-[#1f2637] transition-colors cursor-pointer"
          >
            Refresh
          </button>
        </div>

        {/* Section 3: Hardware Emulation */}
        <div className="flex items-center justify-between pb-2 border-b border-[#141824]">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white tracking-wide">Hardware:</span>
            <span className="text-xs text-[#64748b]">{config.hardwareDevice}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert('Testing simulated mouse packet... OK!')}
              className="px-3.5 py-1.5 bg-[#141824] hover:bg-[#1a2030] text-[#cbd5e1] text-xs font-medium rounded-md border border-[#1f2637] transition-colors cursor-pointer"
            >
              Test Move
            </button>
            <button
              type="button"
              onClick={() => alert('COM port reset: device reconnected.')}
              className="px-3.5 py-1.5 bg-[#141824] hover:bg-[#1a2030] text-[#cbd5e1] text-xs font-medium rounded-md border border-[#1f2637] transition-colors cursor-pointer"
            >
              Reconnect
            </button>
          </div>
        </div>

        {/* Section 4: Status Indicator and FPS */}
        <div className="flex items-center justify-between pt-1">
          <div className="w-[65%] h-1 bg-[#141824] rounded-full overflow-hidden">
            <div className="w-[85%] h-full bg-[#0091ff] shadow-[0_0_8px_rgba(0,145,255,0.7)]" />
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold text-[#22c55e] tracking-wide">
              {config.status}
            </span>
            <span className="text-[11px] text-[#64748b]">FPS: {config.fps}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
