import React, { createContext, useContext, useState } from 'react';
import type { AppConfig, MainCategory, SubTab } from '../types/config';

interface ConfigContextType {
  config: AppConfig;
  updateConfig: <K extends keyof AppConfig>(key: K, value: AppConfig[K]) => void;
  mainCategory: MainCategory;
  setMainCategory: (cat: MainCategory) => void;
  subTab: SubTab;
  setSubTab: (tab: SubTab) => void;
  showWelcome: boolean;
  setShowWelcome: (show: boolean) => void;
  modalContent: { title: string; component: React.ReactNode } | null;
  setModalContent: (content: { title: string; component: React.ReactNode } | null) => void;
}

const defaultConfig: AppConfig = {
  // Tab 1: Aiming (Image 2)
  aimbotEnabled: true,
  targetBone: 'Random',
  strength: 75.0,
  fov: 250,
  autoAimEnabled: false,
  keybind: 'Escape',
  backupKeybind: 'Ctrl',

  // Tab 2: Weapon-Slots (Image 3)
  weaponActiveSlot: 1,
  weaponSlotsState: {
    1: { enabled: true, targetBone: 'Neck', strength: 70.0, fov: 250 },
    2: { enabled: true, targetBone: 'Head', strength: 75.0, fov: 220 },
    3: { enabled: true, targetBone: 'Body', strength: 65.0, fov: 280 },
    4: { enabled: false, targetBone: 'Random', strength: 70.0, fov: 250 },
    5: { enabled: false, targetBone: 'Custom', strength: 70.0, fov: 250 },
  },
  predictionBetaEnabled: false,
  predictionBetaValue: 1207,

  // Tab 3: Humanization (Image 4)
  progressiveSlowdownEnabled: true,
  progressiveSlowdownValue: 400,
  targetSwitchDelayEnabled: true,
  targetSwitchDelayValue: 400,
  deadzoneEnabled: true,
  deadzoneFov: 4,

  // Tab 4: Sticky-Aim (Image 5)
  stickyAimEnabled: false, // OFF in red

  // Tab 5: Triggerbot (Image 6)
  triggerbotEnabled: true,
  triggerbotSlotConfigsEnabled: true,
  activeSlot: 1,
  slots: [
    { id: 1, enabled: true, name: 'Slot 1', firstShotDelay: 524, shotDelay: 365 },
    { id: 2, enabled: false, name: 'Slot 2', firstShotDelay: 480, shotDelay: 320 },
    { id: 3, enabled: false, name: 'Slot 3', firstShotDelay: 510, shotDelay: 340 },
    { id: 4, enabled: false, name: 'Slot 4', firstShotDelay: 490, shotDelay: 310 },
    { id: 5, enabled: false, name: 'Slot 5', firstShotDelay: 530, shotDelay: 360 },
  ],
  firstShotDelay: 524,
  shotDelay: 365,
  enableKeybind: false,

  // Tab 6: RCS (Image 7)
  antiRecoilEnabled: true,
  recoilSlotConfigsEnabled: false,
  globalRecoilStrength: 28,

  // Tab 7: Prefire (Image 8)
  wallPrefirebotEnabled: true,
  shotgunKeybind: 'None',

  // Tab 8: Visuals (Image 9)
  overlayRiskyEnabled: true,
  showHideMenuKeybind: 'F9',
  showInfoEnabled: false,
  showFovColor: '#ffffff',
  showFovEnabled: false,
  showCrosshairColor: '#ef4444',
  showCrosshairEnabled: false,
  showBoxEnabled: false,
  showLineColor: '#ffffff',
  showLineEnabled: false,
  showPointColor: '#0091ff',
  showPointEnabled: false,
  showConfidenceColor: '#ffffff',
  showConfidenceEnabled: false,

  // Tab 9: Game-Settings (Image 10)
  sensitivity: 9.402,
  adsSensitivity: 31.624,
  slotBinds: {
    slot1: 'Tab',
    slot2: 'Caps Lock',
    slot3: '4',
    slot4: 'C',
    slot5: 'V',
    knife: '1',
  },

  // Tab 10: General Settings (Image 11)
  captureMethod: 'DXGI Capture',
  multithreadingEnabled: false,
  reduceSystemUsageEnabled: false,
  discordRpcEnabled: false,
  tournamentModeEnabled: false,
  enableSquareFov: false,
  captureKmboxKeystrokes: false,
  killSwitchKeybind: 'None',

  // Tab 11: AI Settings (Image 12)
  aiConfidence: 0.400,
  aiNms: 0.298,
  blobSize: 256,
  showAiWindow: false,

  // Tab 12: Style Settings (Image 13)
  uiBlur: 1.000,
  uiRounding: 20.000,
  uiColor: '#0091ff',

  // Tab 13: Configs (Image 14)
  configsList: [
    { id: '1', name: 'universal.cfg', active: true, favorite: true },
    { id: '2', name: 'fn_op.cfg', active: false, favorite: false },
    { id: '3', name: 'val-mid (main).cfg', active: false, favorite: false },
  ],
  activeConfigId: '1',

  // Tab 14: Information (Image 15)
  licenseExpiry: 'Fri 05/22/26 23:47',
  resolution: '2560x1440',
  osVersion: 'Windows 11 25H2',
  gpuName: 'NVIDIA GeForce RTX 5090',
  cpuName: 'Intel(R) Core(TM) i5-10310U @ 4.40 GHz',
  hardwareDevice: 'None',
  fps: 360,
  status: 'Running...',

  // Welcome Screen (Image 1)
  aiModel: 'BR-1',
  inputMethod: 'Software Based 1',
  controllerMethod: 'None',
  runtimeEngine: 'ALTERNATIVE',
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AppConfig>(() => {
    try {
      const saved = localStorage.getItem('raven_config');
      if (saved) {
        return { ...defaultConfig, ...JSON.parse(saved) };
      }
    } catch {
      // fallback to default
    }
    return defaultConfig;
  });

  const [mainCategory, setMainCategoryState] = useState<MainCategory>('mouse');
  const [subTab, setSubTab] = useState<SubTab>('Aiming');
  const [showWelcome, setShowWelcome] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{ title: string; component: React.ReactNode } | null>(null);

  const setMainCategory = (cat: MainCategory) => {
    setMainCategoryState(cat);
    if (cat === 'mouse') {
      setSubTab('Aiming');
    } else if (cat === 'shield') {
      setSubTab('RCS');
    } else if (cat === 'settings') {
      setSubTab('Game-Settings');
    } else if (cat === 'user') {
      setSubTab('Configs');
    }
  };

  const updateConfig = <K extends keyof AppConfig>(key: K, value: AppConfig[K]) => {
    setConfig(prev => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem('raven_config', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateConfig,
        mainCategory,
        setMainCategory,
        subTab,
        setSubTab,
        showWelcome,
        setShowWelcome,
        modalContent,
        setModalContent,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig must be used within ConfigProvider');
  return ctx;
};
