import React, { useState, useRef, useEffect } from 'react';

interface ColorBoxProps {
  color: string;
  onChange: (color: string) => void;
}

const PRESET_COLORS = [
  '#ffffff',
  '#ef4444',
  '#0091ff',
  '#22c55e',
  '#eab308',
  '#a855f7',
  '#06b6d4',
  '#f97316',
];

export const ColorBox: React.FC<ColorBoxProps> = ({ color, onChange }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-[18px] h-[18px] rounded-[3px] border border-black/40 shadow-sm transition-transform hover:scale-110 cursor-pointer block"
        style={{ backgroundColor: color }}
        title="Change color"
      />

      {open && (
        <div className="absolute right-0 top-full mt-2 p-2 bg-[#121620] border border-[#232a3b] rounded-lg shadow-2xl z-50 flex flex-col gap-2 min-w-[140px]">
          <div className="text-[11px] font-medium text-[#94a3b8]">Select Color</div>
          <div className="grid grid-cols-4 gap-1.5">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  onChange(c);
                  setOpen(false);
                }}
                className={`w-6 h-6 rounded border transition-transform hover:scale-110 cursor-pointer ${
                  color.toLowerCase() === c.toLowerCase() ? 'ring-2 ring-[#0091ff]' : 'border-black/30'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-6 rounded bg-transparent cursor-pointer border border-[#232a3b]"
          />
        </div>
      )}
    </div>
  );
};
