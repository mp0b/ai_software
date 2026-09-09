import React from 'react';
import { ShieldCheck, Cpu, Key, Clock } from 'lucide-react';

export const ProfileView: React.FC = () => {
  return (
    <div className="flex flex-col gap-3.5 px-6 py-2 animate-in fade-in duration-150">
      <div className="p-4 rounded-xl bg-[#0d1017] border border-[#1b2230] flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0084ff] to-[#38bdf8] flex items-center justify-center font-bold text-lg text-white shadow-[0_0_15px_rgba(0,145,255,0.4)]">
          N
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-base">Nyron VIP User</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0084ff]/20 text-[#0091ff] border border-[#0084ff]/40">
              LIFETIME
            </span>
          </div>
          <span className="text-xs text-[#64748b]">License Key: NYRON-PRO-8849-V2</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 bg-[#0d1017] border border-[#161a25] rounded-lg flex items-center gap-2.5">
          <ShieldCheck size={18} className="text-[#22c55e]" />
          <div className="flex flex-col">
            <span className="text-[11px] text-[#64748b]">HWID Lock</span>
            <span className="text-xs font-semibold text-[#cbd5e1]">Verified & Linked</span>
          </div>
        </div>

        <div className="p-3 bg-[#0d1017] border border-[#161a25] rounded-lg flex items-center gap-2.5">
          <Cpu size={18} className="text-[#0091ff]" />
          <div className="flex flex-col">
            <span className="text-[11px] text-[#64748b]">Injection Engine</span>
            <span className="text-xs font-semibold text-[#cbd5e1]">Direct Kernel V3</span>
          </div>
        </div>

        <div className="p-3 bg-[#0d1017] border border-[#161a25] rounded-lg flex items-center gap-2.5">
          <Clock size={18} className="text-[#eab308]" />
          <div className="flex flex-col">
            <span className="text-[11px] text-[#64748b]">Subscription</span>
            <span className="text-xs font-semibold text-[#cbd5e1]">Never Expires</span>
          </div>
        </div>

        <div className="p-3 bg-[#0d1017] border border-[#161a25] rounded-lg flex items-center gap-2.5">
          <Key size={18} className="text-[#a855f7]" />
          <div className="flex flex-col">
            <span className="text-[11px] text-[#64748b]">Build Version</span>
            <span className="text-xs font-semibold text-[#cbd5e1]">v2.5.4 Stable</span>
          </div>
        </div>
      </div>
    </div>
  );
};
