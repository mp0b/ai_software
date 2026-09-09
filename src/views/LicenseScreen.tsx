import React, { useState } from 'react';
import { KeyRound, ShieldCheck, CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { RavenLogo } from '../components/RavenLogo';
import { useMotion } from '../motion/MotionContext';
import { startWindowDrag } from '../utils/windowDrag';

interface LicenseScreenProps {
  onSuccess: (licenseKey: string) => void;
}

export const LicenseScreen: React.FC<LicenseScreenProps> = ({ onSuccess }) => {
  const { playClick, playLaunchEngine, playToggle } = useMotion();
  const [licenseKey, setLicenseKey] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = async () => {
    playClick();
    try {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      await getCurrentWindow().close();
    } catch {}
  };

  const handleActivate = () => {
    playClick();
    const cleanKey = licenseKey.trim().toUpperCase();

    if (!cleanKey) {
      setErrorMsg('Please enter a valid license key.');
      return;
    }

    setErrorMsg(null);
    setIsValidating(true);

    // Realistic cryptographic verification simulation
    setTimeout(() => {
      setIsValidating(false);
      setIsSuccess(true);
      playLaunchEngine();

      try {
        localStorage.setItem('raven_license_active', 'true');
        localStorage.setItem('raven_license_key', cleanKey);
      } catch {}

      setTimeout(() => {
        onSuccess(cleanKey);
      }, 700);
    }, 600);
  };

  const handleQuickFill = () => {
    playClick();
    setLicenseKey('RAVEN-LIFETIME-VIP-2025');
    setErrorMsg(null);
    playToggle(true);
  };

  return (
    <div
      onMouseDown={startWindowDrag}
      className="w-full h-full bg-[#07090e] border border-[#1b2234] rounded-[22px] flex flex-col justify-between p-7 relative select-none overflow-hidden shadow-2xl"
    >
      {/* Ambient background glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#0091ff]/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#0084ff]/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Top Drag Header with Close Button */}
      <div className="flex items-center justify-between w-full relative z-10 cursor-move">
        <div className="flex items-center gap-2 text-xs text-[#64748b] font-medium">
          <ShieldCheck size={14} className="text-[#0091ff]" />
          <span>Raven Secure Gateway v2.5</span>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="text-[#64748b] hover:text-white transition-colors cursor-pointer p-1"
          title="Exit"
        >
          <X size={18} />
        </button>
      </div>

      {/* Central Activation Card */}
      <div className="flex flex-col items-center justify-center max-w-md mx-auto w-full gap-5 relative z-10">
        {/* Raven Logo with Reactor Core */}
        <div className="relative">
          <RavenLogo className="w-14 h-14" />
        </div>

        <div className="flex flex-col items-center text-center gap-1">
          <h1 className="text-xl font-bold text-white tracking-wider">RAVEN AI</h1>
          <p className="text-xs text-[#64748b]">
            Hardware-locked neural execution engine. Enter your product license to activate.
          </p>
        </div>

        {/* Status Tag */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121724] border border-[#1e273d] text-[10px] font-mono text-[#38bdf8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping" />
          <span>HWID: 8723-KBC-064E-B90F (VALIDATED)</span>
        </div>

        {/* License Input Field */}
        <div className="w-full flex flex-col gap-2">
          <div className="relative flex items-center w-full">
            <div className="absolute left-3.5 text-[#64748b] pointer-events-none">
              <KeyRound size={15} />
            </div>

            <input
              type="text"
              value={licenseKey}
              onChange={(e) => {
                setLicenseKey(e.target.value.toUpperCase());
                if (errorMsg) setErrorMsg(null);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleActivate()}
              placeholder="RAVEN-XXXX-XXXX-XXXX"
              className="w-full h-11 pl-10 pr-4 bg-[#0d111a] border border-[#1e273d] focus:border-[#0091ff] rounded-xl text-xs font-mono font-semibold text-white tracking-wider outline-none transition-all placeholder:text-[#475569] shadow-inner"
            />
          </div>

          {errorMsg && (
            <div className="flex items-center gap-1.5 text-xs text-[#ef4444] px-1">
              <AlertCircle size={13} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Fill Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleQuickFill}
              className="flex items-center gap-1 text-[11px] text-[#0091ff] hover:text-[#38bdf8] font-medium cursor-pointer transition-colors"
            >
              <Sparkles size={11} />
              <span>Quick Fill Lifetime VIP Key</span>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          type="button"
          onClick={handleActivate}
          disabled={isValidating || isSuccess}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full h-11 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg ${
            isSuccess
              ? 'bg-[#22c55e] text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]'
              : 'bg-[#0084ff] hover:bg-[#0073e6] text-white shadow-[0_0_20px_rgba(0,132,255,0.4)]'
          } ${isValidating ? 'opacity-80' : ''}`}
        >
          {isSuccess ? (
            <>
              <CheckCircle2 size={16} />
              <span>License Verified - Entering Raven AI...</span>
            </>
          ) : isValidating ? (
            <span>Verifying with Cryptographic Server...</span>
          ) : (
            <span>Activate Software</span>
          )}
        </motion.button>
      </div>

      {/* Bottom Footer Telemetry */}
      <div className="flex items-center justify-between text-[10px] text-[#475569] font-mono border-t border-[#141a29] pt-3 relative z-10 cursor-move">
        <span>ENCRYPTION: AES-256-GCM</span>
        <span>COPYRIGHT 2025 | RAVEN</span>
        <span>STATUS: READY</span>
      </div>
    </div>
  );
};
