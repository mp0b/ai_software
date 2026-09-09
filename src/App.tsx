import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { TopTabs } from './components/TopTabs';
import { GearModal } from './components/Controls/GearModal';
import { useConfig } from './context/ConfigContext';
import { MotionProvider } from './motion/MotionContext';
import { CyberCanvas } from './motion/CyberCanvas';
import { MouseAura } from './motion/MouseAura';
import { CyberTransition } from './motion/CyberTransition';
import { LicenseScreen } from './views/LicenseScreen';
import { startWindowDrag } from './utils/windowDrag';

// Authentic Views
import { AimingView } from './views/AimingView';
import { WeaponSlotsView } from './views/WeaponSlotsView';
import { HumanizationView } from './views/HumanizationView';
import { StickyAimView } from './views/StickyAimView';
import { TriggerbotView } from './views/TriggerbotView';
import { RCSView } from './views/RCSView';
import { PrefireView } from './views/PrefireView';
import { VisualsView } from './views/VisualsView';
import { GameSettingsView } from './views/GameSettingsView';
import { GeneralSettingsView } from './views/GeneralSettingsView';
import { AISettingsView } from './views/AISettingsView';
import { StyleSettingsView } from './views/StyleSettingsView';
import { ConfigsView } from './views/ConfigsView';
import { InformationView } from './views/InformationView';
import { WelcomeView } from './views/WelcomeView';

export const AppContent: React.FC = () => {
  const { subTab, showWelcome } = useConfig();
  const [isLicensed, setIsLicensed] = useState(() => {
    try {
      return localStorage.getItem('raven_license_active') === 'true';
    } catch {
      return false;
    }
  });

  // If user has not activated a license yet, show the License Activation Gateway
  if (!isLicensed) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-transparent p-0 select-none">
        <LicenseScreen
          onSuccess={() => {
            setIsLicensed(true);
          }}
        />
      </div>
    );
  }

  const renderActiveView = () => {
    if (showWelcome) {
      return <WelcomeView />;
    }

    switch (subTab) {
      // Category: Mouse
      case 'Aiming':
        return <AimingView />;
      case 'Weapon-Slots':
        return <WeaponSlotsView />;
      case 'Humanization':
        return <HumanizationView />;

      // Category: Shield
      case 'Sticky-Aim':
        return <StickyAimView />;
      case 'Triggerbot':
        return <TriggerbotView />;
      case 'RCS':
        return <RCSView />;
      case 'Prefire':
        return <PrefireView />;
      case 'Visuals':
        return <VisualsView />;

      // Category: Gear (Settings)
      case 'Game-Settings':
        return <GameSettingsView />;
      case 'General':
        return <GeneralSettingsView />;
      case 'AI':
        return <AISettingsView />;
      case 'Style':
        return <StyleSettingsView />;

      // Category: User (Profile & Configs)
      case 'Configs':
        return <ConfigsView />;
      case 'Information':
        return <InformationView />;

      default:
        return <AimingView />;
    }
  };

  const currentKey = showWelcome ? 'welcome' : subTab;

  return (
    <div
      onMouseDown={startWindowDrag}
      className="w-screen h-screen bg-[#08090d] border border-[#1b2234] rounded-[22px] flex overflow-hidden ring-1 ring-white/5 relative select-none shadow-2xl"
    >
      {/* 120 FPS Background Cyber Engine Canvas */}
      <CyberCanvas />

      {/* Mouse Radial Glow Aura */}
      <MouseAura />

      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Main Content Panel */}
      <div className="flex-1 flex flex-col justify-between bg-[#08090d]/80 backdrop-blur-sm relative overflow-hidden z-10">
        {/* Top Bar with Tabs and Close Button */}
        <TopTabs />

        {/* Tab Content Area with Smooth Motion Transitions */}
        <div className="flex-1 overflow-y-auto px-1 py-1 relative">
          <AnimatePresence mode="wait">
            <CyberTransition key={currentKey} viewKey={currentKey}>
              {renderActiveView()}
            </CyberTransition>
          </AnimatePresence>
        </div>

        {/* Bottom Footer - Native Window Dragging Region */}
        <div
          data-tauri-drag-region
          onMouseDown={startWindowDrag}
          className="w-full py-3.5 flex items-center justify-center text-center select-none cursor-move"
        >
          <span className="text-xs font-normal text-[#3b4252] tracking-wide pointer-events-none">
            Copyright 2025 | Raven
          </span>
        </div>
      </div>

      {/* Modal for Gear Tuning / Popups */}
      <GearModal />
    </div>
  );
};

export function App() {
  return (
    <MotionProvider>
      <AppContent />
    </MotionProvider>
  );
}

export default App;
