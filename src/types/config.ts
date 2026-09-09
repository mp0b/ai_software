export type TargetBone = 'Head' | 'Neck' | 'Body' | 'Random' | 'Custom';

export type MainCategory = 'mouse' | 'shield' | 'settings' | 'user';

export type MouseSubTab = 'Aiming' | 'Weapon-Slots' | 'Humanization';
export type ShieldSubTab = 'Sticky-Aim' | 'Triggerbot' | 'RCS' | 'Prefire' | 'Visuals';
export type SettingsSubTab = 'Game-Settings' | 'General' | 'AI' | 'Style';
export type UserSubTab = 'Configs' | 'Information';

export type SubTab = MouseSubTab | ShieldSubTab | SettingsSubTab | UserSubTab;

export interface SlotConfig {
  id: number;
  enabled: boolean;
  name: string;
  firstShotDelay: number;
  shotDelay: number;
}

export interface ConfigProfile {
  id: string;
  name: string;
  active: boolean;
  favorite: boolean;
}

export type CaptureMethod = 'GDI Capture' | 'DXGI Capture' | 'NDI Stream' | 'Capture Card';

export interface AppConfig {
  // Tab 1: Aiming (Image 2)
  aimbotEnabled: boolean;
  targetBone: TargetBone;
  strength: number; // 75.0%
  fov: number; // 250 px
  autoAimEnabled: boolean;
  keybind: string; // "Escape"
  backupKeybind: string; // "Ctrl"

  // Tab 2: Weapon-Slots (Image 3)
  weaponActiveSlot: number; // 1
  weaponSlotsState: { [id: number]: { enabled: boolean; targetBone: TargetBone; strength: number; fov: number } };
  predictionBetaEnabled: boolean;
  predictionBetaValue: number; // 1207

  // Tab 3: Humanization (Image 4)
  progressiveSlowdownEnabled: boolean;
  progressiveSlowdownValue: number; // 400
  targetSwitchDelayEnabled: boolean;
  targetSwitchDelayValue: number; // 400 ms
  deadzoneEnabled: boolean;
  deadzoneFov: number; // 4 px

  // Tab 4: Sticky-Aim (Image 5)
  stickyAimEnabled: boolean; // default false (shows red OFF)

  // Tab 5: Triggerbot (Image 6)
  triggerbotEnabled: boolean;
  triggerbotSlotConfigsEnabled: boolean;
  activeSlot: number; // 1
  slots: SlotConfig[];
  firstShotDelay: number; // 524 ms
  shotDelay: number; // 365 ms
  enableKeybind: boolean;

  // Tab 6: RCS (Image 7)
  antiRecoilEnabled: boolean;
  recoilSlotConfigsEnabled: boolean;
  globalRecoilStrength: number; // 28

  // Tab 7: Prefire (Image 8)
  wallPrefirebotEnabled: boolean; // default true (green ON)
  shotgunKeybind: string; // "None"

  // Tab 8: Visuals (Image 9)
  overlayRiskyEnabled: boolean;
  showHideMenuKeybind: string; // "F9"
  showInfoEnabled: boolean;
  showFovColor: string; // "#ffffff"
  showFovEnabled: boolean;
  showCrosshairColor: string; // "#ef4444"
  showCrosshairEnabled: boolean;
  showBoxEnabled: boolean;
  showLineColor: string; // "#ffffff"
  showLineEnabled: boolean;
  showPointColor: string; // "#0091ff"
  showPointEnabled: boolean;
  showConfidenceColor: string; // "#ffffff"
  showConfidenceEnabled: boolean;

  // Tab 9: Game-Settings (Image 10)
  sensitivity: number; // 9.402
  adsSensitivity: number; // 31.624
  slotBinds: {
    slot1: string; // "Tab"
    slot2: string; // "Caps Lock"
    slot3: string; // "4"
    slot4: string; // "C"
    slot5: string; // "V"
    knife: string; // "1"
  };

  // Tab 10: General Settings (Image 11)
  captureMethod: CaptureMethod;
  multithreadingEnabled: boolean;
  reduceSystemUsageEnabled: boolean;
  discordRpcEnabled: boolean;
  tournamentModeEnabled: boolean;
  enableSquareFov: boolean;
  captureKmboxKeystrokes: boolean;
  killSwitchKeybind: string; // "None"

  // Tab 11: AI Settings (Image 12)
  aiConfidence: number; // 0.400
  aiNms: number; // 0.298
  blobSize: 128 | 256 | 416; // 256
  showAiWindow: boolean;

  // Tab 12: Style Settings (Image 13)
  uiBlur: number; // 1.000
  uiRounding: number; // 20.000
  uiColor: string; // "#0091ff"

  // Tab 13: Configs (Image 14)
  configsList: ConfigProfile[];
  activeConfigId: string;

  // Tab 14: Information (Image 15)
  licenseExpiry: string; // "Fri 05/22/26 23:47"
  resolution: string; // "2560x1440"
  osVersion: string; // "Windows 11 25H2"
  gpuName: string; // "NVIDIA GeForce RTX 5090"
  cpuName: string; // "Intel(R) Core(TM) i5-10310U @ 4.40 GHz"
  hardwareDevice: string; // "None"
  fps: number; // 360
  status: string; // "Running..."

  // Welcome Screen (Image 1)
  aiModel: string; // "BR-1"
  inputMethod: string; // "Software Based 1"
  controllerMethod: string; // "None"
  runtimeEngine: string; // "ALTERNATIVE"
}
