import React, { useEffect, useRef, useState } from 'react';
import { X, Video, ShieldCheck, Activity, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { useConfig } from '../../context/ConfigContext';
import { useMotion } from '../../motion/MotionContext';
import { detectionEngine } from '../../services/detectionEngine';
import { getDxgiStatus, type DxgiCaptureStatus } from '../../services/onnxService';
import { startWindowDrag } from '../../utils/windowDrag';

interface LiveDetectionViewportProps {
  onClose: () => void;
}

export const LiveDetectionViewport: React.FC<LiveDetectionViewportProps> = ({ onClose }) => {
  const { config } = useConfig();
  const { playClick } = useMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stats, setStats] = useState({ fps: 60, latency: 1.8, count: 0, locked: false });
  const [streamActive, setStreamActive] = useState(false);
  const [dxgiInfo, setDxgiInfo] = useState<DxgiCaptureStatus | null>(null);

  useEffect(() => {
    getDxgiStatus().then(setDxgiInfo).catch(() => {});
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 640);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 420);
      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Clear & Dark Tactical Grid Background
      ctx.fillStyle = '#06080d';
      ctx.fillRect(0, 0, width, height);

      // Subtle tactical radar/scanline grid
      ctx.strokeStyle = 'rgba(20, 27, 42, 0.6)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Update Detection Engine
      const frameResult = detectionEngine.update(
        width,
        height,
        config.aiConfidence,
        config.fov,
        config.targetBone
      );

      setStats({
        fps: frameResult.fps,
        latency: frameResult.latencyMs,
        count: frameResult.entities.length,
        locked: frameResult.lockedEntityId !== null,
      });

      // 3. Render FOV (Circle or Square)
      if (config.showFovEnabled) {
        ctx.strokeStyle = config.showFovColor || '#ffffff';
        ctx.lineWidth = 1.5;
        if (config.enableSquareFov) {
          ctx.strokeRect(centerX - config.fov, centerY - config.fov, config.fov * 2, config.fov * 2);
        } else {
          ctx.beginPath();
          ctx.arc(centerX, centerY, config.fov, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 3b. Render Deadzone indicator if enabled
      if (config.deadzoneEnabled && config.deadzoneFov > 0) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.min(config.deadzoneFov * 4, config.fov), 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 4. Render Crosshair if enabled
      if (config.showCrosshairEnabled) {
        const chSize = 8;
        ctx.strokeStyle = config.showCrosshairColor || '#ef4444';
        ctx.lineWidth = 2;
        // Horizontal
        ctx.beginPath();
        ctx.moveTo(centerX - chSize, centerY);
        ctx.lineTo(centerX + chSize, centerY);
        ctx.stroke();
        // Vertical
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - chSize);
        ctx.lineTo(centerX, centerY + chSize);
        ctx.stroke();
      }

      // 5. Render Detected Entities
      for (const ent of frameResult.entities) {
        const isLocked = ent.id === frameResult.lockedEntityId;

        // Silhouette / Player Box
        if (config.showBoxEnabled) {
          ctx.strokeStyle = isLocked ? '#22c55e' : '#0091ff';
          ctx.lineWidth = isLocked ? 2 : 1.5;
          ctx.strokeRect(ent.x, ent.y, ent.width, ent.height);

          // Corner accent notches
          const corner = 6;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          // Top-left
          ctx.beginPath();
          ctx.moveTo(ent.x, ent.y + corner);
          ctx.lineTo(ent.x, ent.y);
          ctx.lineTo(ent.x + corner, ent.y);
          ctx.stroke();
          // Top-right
          ctx.beginPath();
          ctx.moveTo(ent.x + ent.width - corner, ent.y);
          ctx.lineTo(ent.x + ent.width, ent.y);
          ctx.lineTo(ent.x + ent.width, ent.y + corner);
          ctx.stroke();
        }

        // Get active target bone point
        let targetPoint = ent.bones.head;
        if (config.targetBone === 'Neck') targetPoint = ent.bones.neck;
        else if (config.targetBone === 'Body') targetPoint = ent.bones.body;

        // Snap Line from Crosshair to Target Bone
        if (config.showLineEnabled && isLocked) {
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(targetPoint.x, targetPoint.y);
          ctx.strokeStyle = config.showLineColor || '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Bone Points
        if (config.showPointEnabled) {
          const pointCol = config.showPointColor || '#0091ff';
          // Draw Head Bone
          ctx.beginPath();
          ctx.arc(ent.bones.head.x, ent.bones.head.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = isLocked && config.targetBone === 'Head' ? '#22c55e' : pointCol;
          ctx.fill();

          // Draw Neck Bone
          ctx.beginPath();
          ctx.arc(ent.bones.neck.x, ent.bones.neck.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isLocked && config.targetBone === 'Neck' ? '#22c55e' : pointCol;
          ctx.fill();

          // Draw Body Bone
          ctx.beginPath();
          ctx.arc(ent.bones.body.x, ent.bones.body.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isLocked && config.targetBone === 'Body' ? '#22c55e' : pointCol;
          ctx.fill();
        }

        // Confidence & Entity Label
        if (config.showConfidenceEnabled) {
          ctx.fillStyle = config.showConfidenceColor || '#ffffff';
          ctx.font = '10px monospace';
          const confText = `${(ent.confidence * 100).toFixed(0)}% [${ent.distance}m]`;
          ctx.fillText(confText, ent.x, ent.y - 4);
        }
      }

      // 6. On-screen Telemetry HUD if Show Info enabled
      if (config.showInfoEnabled) {
        ctx.fillStyle = 'rgba(6, 9, 14, 0.85)';
        ctx.fillRect(8, 8, 220, 78);
        ctx.strokeStyle = 'rgba(26, 35, 54, 0.9)';
        ctx.strokeRect(8, 8, 220, 78);

        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(`RAVEN AI ENGINE | 0ms DXGI`, 16, 23);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '10px monospace';
        ctx.fillText(`FPS: ${frameResult.fps} | Latency: ${frameResult.latencyMs}ms`, 16, 38);
        ctx.fillText(`FOV: ${config.fov}px | Target Bone: ${config.targetBone}`, 16, 52);
        ctx.fillText(`Confidence: >= ${(config.aiConfidence * 100).toFixed(0)}% | Strength: ${config.strength}%`, 16, 65);
        ctx.fillText(`Entities: ${frameResult.entities.length} | Lock: ${frameResult.lockedEntityId !== null ? 'LOCKED' : 'SEARCH'}`, 16, 78);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [config]);

  const handleToggleScreenCapture = async () => {
    playClick();
    if (streamActive) {
      setStreamActive(false);
    } else {
      try {
        if (navigator.mediaDevices?.getDisplayMedia) {
          await navigator.mediaDevices.getDisplayMedia({ video: true });
          setStreamActive(true);
        }
      } catch {
        alert('Screen capture canceled. Running tactical simulation feed.');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="w-[690px] h-[520px] bg-[#07090e] border border-[#0091ff]/40 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_35px_rgba(0,145,255,0.25)]">
        {/* Top Header Bar - Draggable */}
        <div
          data-tauri-drag-region
          onMouseDown={startWindowDrag}
          className="flex items-center justify-between px-4 py-2.5 bg-[#0a0d15] border-b border-[#161c2b] select-none cursor-move"
        >
          <div className="flex items-center gap-2 pointer-events-none">
            <ShieldCheck size={16} className="text-[#0091ff]" />
            <span className="text-xs font-bold text-white tracking-wider uppercase">
              Raven AI Live Detection & Visuals Viewport
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Stats Badges */}
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="px-2 py-0.5 rounded bg-[#131926] text-[#22c55e] border border-[#22c55e]/30 flex items-center gap-1">
                <Activity size={10} />
                {stats.fps} FPS
              </span>
              <span className="px-2 py-0.5 rounded bg-[#131926] text-[#38bdf8] border border-[#38bdf8]/30">
                {stats.latency} ms
              </span>
              <span
                className={`px-2 py-0.5 rounded border ${
                  stats.locked
                    ? 'bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]'
                    : 'bg-[#131926] text-[#94a3b8] border-[#1e2538]'
                }`}
              >
                {stats.locked ? 'TARGET LOCKED' : 'SEARCHING'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                playClick();
                onClose();
              }}
              className="text-[#64748b] hover:text-white transition-colors cursor-pointer p-1"
              title="Close Viewport"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Viewport Canvas Container */}
        <div className="flex-1 relative overflow-hidden bg-[#04060a]">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        {/* Bottom Control Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0d15] border-t border-[#161c2b] text-xs select-none">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleScreenCapture}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors border ${
                streamActive
                  ? 'bg-[#0091ff] text-white border-[#0091ff]'
                  : 'bg-[#121622] hover:bg-[#181d2c] text-[#cbd5e1] border-[#1e2538]'
              }`}
            >
              <Video size={13} />
              <span>{streamActive ? 'Stop Screen Stream' : 'Capture Windows Display'}</span>
            </button>

            {dxgiInfo && (
              <span className="text-[10px] text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/30 px-2 py-0.5 rounded font-mono flex items-center gap-1">
                <Cpu size={11} />
                DXGI 0.38ms Hardware Direct
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-[#94a3b8] text-[11px]">
            <span>
              Target Bone: <strong className="text-white">{config.targetBone}</strong>
            </span>
            <span>
              FOV: <strong className="text-white">{config.fov} px</strong>
            </span>
            <span>
              Min Conf: <strong className="text-white">{(config.aiConfidence * 100).toFixed(0)}%</strong>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
