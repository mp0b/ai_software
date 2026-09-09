import React from 'react';
import { X } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';

export const GearModal: React.FC = () => {
  const { modalContent, setModalContent } = useConfig();

  if (!modalContent) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={() => setModalContent(null)}
    >
      <div
        className="w-[380px] bg-[#0c0f16] border border-[#1f2637] rounded-xl p-5 shadow-2xl text-white flex flex-col gap-4 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#181d2a] pb-3">
          <span className="font-semibold text-sm tracking-wide text-white">
            {modalContent.title}
          </span>
          <button
            type="button"
            onClick={() => setModalContent(null)}
            className="text-[#64748b] hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="text-xs text-[#94a3b8] flex flex-col gap-3">
          {modalContent.component}
        </div>
      </div>
    </div>
  );
};
