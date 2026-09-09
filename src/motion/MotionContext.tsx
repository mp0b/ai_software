import React, { createContext, useContext, useState, useEffect } from 'react';
import { audioEngine } from './audioEngine';

export type ParticlesMode = 'cyber' | 'quantum' | 'off';
export type AnimationSpeed = 'smooth' | 'normal' | 'turbo';

export interface MotionConfig {
  soundEnabled: boolean;
  soundVolume: number;
  particlesMode: ParticlesMode;
  mouseAuraEnabled: boolean;
  tilt3DEnabled: boolean;
  animationSpeed: AnimationSpeed;
}

const DEFAULT_MOTION_CONFIG: MotionConfig = {
  soundEnabled: true,
  soundVolume: 0.4,
  particlesMode: 'cyber',
  mouseAuraEnabled: true,
  tilt3DEnabled: true,
  animationSpeed: 'normal',
};

const STORAGE_KEY = 'raven_motion_config';

interface MotionContextType extends MotionConfig {
  setSoundEnabled: (val: boolean) => void;
  setSoundVolume: (val: number) => void;
  setParticlesMode: (mode: ParticlesMode) => void;
  setMouseAuraEnabled: (val: boolean) => void;
  setTilt3DEnabled: (val: boolean) => void;
  setAnimationSpeed: (speed: AnimationSpeed) => void;
  playToggle: (isOn: boolean) => void;
  playTabSwitch: () => void;
  playSliderTick: () => void;
  playClick: () => void;
  playLaunchEngine: () => void;
  getSpringConfig: () => { stiffness: number; damping: number; mass: number };
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<MotionConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_MOTION_CONFIG, ...JSON.parse(saved) };
      }
    } catch {}
    return DEFAULT_MOTION_CONFIG;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {}
    audioEngine.setEnabled(config.soundEnabled);
    audioEngine.setVolume(config.soundVolume);
  }, [config]);

  const setSoundEnabled = (val: boolean) => {
    setConfig((prev) => ({ ...prev, soundEnabled: val }));
    audioEngine.setEnabled(val);
  };

  const setSoundVolume = (val: number) => {
    setConfig((prev) => ({ ...prev, soundVolume: val }));
    audioEngine.setVolume(val);
  };

  const setParticlesMode = (particlesMode: ParticlesMode) => {
    setConfig((prev) => ({ ...prev, particlesMode }));
  };

  const setMouseAuraEnabled = (mouseAuraEnabled: boolean) => {
    setConfig((prev) => ({ ...prev, mouseAuraEnabled }));
  };

  const setTilt3DEnabled = (tilt3DEnabled: boolean) => {
    setConfig((prev) => ({ ...prev, tilt3DEnabled }));
  };

  const setAnimationSpeed = (animationSpeed: AnimationSpeed) => {
    setConfig((prev) => ({ ...prev, animationSpeed }));
  };

  const playToggle = (isOn: boolean) => audioEngine.playToggle(isOn);
  const playTabSwitch = () => audioEngine.playTabSwitch();
  const playSliderTick = () => audioEngine.playSliderTick();
  const playClick = () => audioEngine.playClick();
  const playLaunchEngine = () => audioEngine.playLaunchEngine();

  const getSpringConfig = () => {
    switch (config.animationSpeed) {
      case 'turbo':
        return { stiffness: 600, damping: 25, mass: 0.8 };
      case 'smooth':
        return { stiffness: 220, damping: 26, mass: 1.2 };
      case 'normal':
      default:
        return { stiffness: 380, damping: 28, mass: 1 };
    }
  };

  return (
    <MotionContext.Provider
      value={{
        ...config,
        setSoundEnabled,
        setSoundVolume,
        setParticlesMode,
        setMouseAuraEnabled,
        setTilt3DEnabled,
        setAnimationSpeed,
        playToggle,
        playTabSwitch,
        playSliderTick,
        playClick,
        playLaunchEngine,
        getSpringConfig,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
};

export const useMotion = () => {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error('useMotion must be used within MotionProvider');
  }
  return ctx;
};
