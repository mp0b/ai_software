import React, { useState } from 'react';
import { FileText, Check, Trash2, Upload, Download, Star } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const ConfigsView: React.FC = () => {
  const { config, updateConfig } = useConfig();
  const [selectedId, setSelectedId] = useState<string>(config.activeConfigId || '1');

  const handleCreateNew = () => {
    const name = prompt('Enter new configuration name (e.g. ranked.cfg):');
    if (!name) return;
    const newConfig = {
      id: Date.now().toString(),
      name: name.endsWith('.cfg') ? name : `${name}.cfg`,
      active: false,
      favorite: false,
    };
    updateConfig('configsList', [...config.configsList, newConfig]);
    setSelectedId(newConfig.id);
  };

  const handleDelete = () => {
    if (config.configsList.length <= 1) {
      alert('Cannot delete the last remaining configuration profile.');
      return;
    }
    const updated = config.configsList.filter((c) => c.id !== selectedId);
    updateConfig('configsList', updated);
    setSelectedId(updated[0].id);
  };

  const handleLoad = () => {
    const updated = config.configsList.map((c) => ({
      ...c,
      active: c.id === selectedId,
    }));
    updateConfig('configsList', updated);
    updateConfig('activeConfigId', selectedId);
  };

  const handleToggleStar = () => {
    const updated = config.configsList.map((c) =>
      c.id === selectedId ? { ...c, favorite: !c.favorite } : c
    );
    updateConfig('configsList', updated);
  };

  const selectedItem = config.configsList.find((c) => c.id === selectedId);

  return (
    <div className="flex flex-col gap-3 px-6 py-2 animate-in fade-in duration-150">
      <div className="p-4 bg-[#0a0d14] border border-[#181d2a] rounded-xl flex flex-col gap-3">
        <span className="font-semibold text-white text-sm tracking-wide">Your Configs:</span>

        {/* Config Files List Container */}
        <div className="flex flex-col bg-[#07090e] border border-[#161a25] rounded-lg p-1.5 max-h-[140px] overflow-y-auto">
          {config.configsList.map((cfg) => {
            const isSelected = selectedId === cfg.id;
            return (
              <div
                key={cfg.id}
                onClick={() => setSelectedId(cfg.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-[#181d2a] text-white'
                    : 'text-[#64748b] hover:bg-[#10141e] hover:text-[#94a3b8]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText size={15} className={isSelected ? 'text-white' : 'text-[#475569]'} />
                  <span className="text-xs font-medium tracking-wide">{cfg.name}</span>
                </div>

                {cfg.active && (
                  <Check size={14} className="text-[#0091ff]" strokeWidth={2.5} />
                )}
              </div>
            );
          })}
        </div>

        {/* Action Button Row */}
        <div className="flex items-center gap-2">
          {/* Delete Button */}
          <button
            type="button"
            onClick={handleDelete}
            title="Delete Selected Config"
            className="w-10 h-9 rounded-md bg-[#230f14] hover:bg-[#34141b] border border-[#401820] flex items-center justify-center text-[#ef4444] transition-colors cursor-pointer"
          >
            <Trash2 size={16} />
          </button>

          {/* Load Button */}
          <button
            type="button"
            onClick={handleLoad}
            className="flex-1 h-9 rounded-md bg-[#181c28] hover:bg-[#202637] border border-[#232a3b] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Upload size={14} />
            <span>Load</span>
          </button>

          {/* Save Button */}
          <button
            type="button"
            onClick={() => alert(`Saved configuration: ${selectedItem?.name}`)}
            className="flex-1 h-9 rounded-md bg-[#181c28] hover:bg-[#202637] border border-[#232a3b] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download size={14} />
            <span>Save</span>
          </button>

          {/* Favorite Star Button */}
          <button
            type="button"
            onClick={handleToggleStar}
            title="Favorite"
            className={`w-10 h-9 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
              selectedItem?.favorite
                ? 'bg-[#29220c] border-[#5e4b17] text-[#eab308]'
                : 'bg-[#181c28] border-[#232a3b] text-[#64748b] hover:text-[#eab308]'
            }`}
          >
            <Star size={16} fill={selectedItem?.favorite ? '#eab308' : 'none'} />
          </button>
        </div>

        {/* Create New Config Button */}
        <button
          type="button"
          onClick={handleCreateNew}
          className="w-full h-10 rounded-md bg-[#0084ff] hover:bg-[#0073e6] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-[0_0_15px_rgba(0,132,255,0.3)]"
        >
          Create New Config
        </button>
      </div>
    </div>
  );
};
