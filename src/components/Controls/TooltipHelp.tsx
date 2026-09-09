import React, { useState } from 'react';

interface TooltipHelpProps {
  text: string;
}

export const TooltipHelp: React.FC<TooltipHelpProps> = ({ text }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex items-center ml-1.5 cursor-help"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span className="text-[#d97706] text-[13px] font-medium transition-colors hover:text-[#f59e0b]">
        (?)
      </span>
      {visible && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-52 p-2.5 bg-[#121620] border border-[#232a3b] text-[#cbd5e1] text-xs rounded-md shadow-xl z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#232a3b]" />
        </div>
      )}
    </div>
  );
};
