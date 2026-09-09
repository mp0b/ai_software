import React, { useState, useEffect } from 'react';
import { Cpu, UploadCloud, CheckCircle2, Zap, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import {
  pickAndLoadOnnxModel,
  loadDefaultSampleModel,
  parseBrowserFile,
  type OnnxModelInfo,
} from '../../services/onnxService';
import { useMotion } from '../../motion/MotionContext';

export const OnnxModelLoader: React.FC = () => {
  const { playClick, playToggle } = useMotion();
  const [modelInfo, setModelInfo] = useState<OnnxModelInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [benchmarkActive, setBenchmarkActive] = useState(false);
  const [benchFps, setBenchFps] = useState<number | null>(null);

  useEffect(() => {
    // Load initial sample model on mount
    loadDefaultSampleModel().then((model) => {
      setModelInfo(model);
    });
  }, []);

  const handlePickFile = async () => {
    playClick();
    setIsLoading(true);
    try {
      const selected = await pickAndLoadOnnxModel();
      if (selected) {
        setModelInfo(selected);
        playToggle(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    playClick();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.toLowerCase().endsWith('.onnx')) {
        setIsLoading(true);
        try {
          const parsed = await parseBrowserFile(file);
          setModelInfo(parsed);
          playToggle(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        alert('Please drop a valid .onnx neural network model file.');
      }
    }
  };

  const handleRunBenchmark = () => {
    if (benchmarkActive || !modelInfo) return;
    playClick();
    setBenchmarkActive(true);
    setBenchFps(null);

    // Simulate 10 iterations on tensor pipeline
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count >= 10) {
        clearInterval(interval);
        const fps = Math.round(1000 / modelInfo.estimatedLatencyMs);
        setBenchFps(fps);
        setBenchmarkActive(false);
        playToggle(true);
      }
    }, 60);
  };

  return (
    <div className="flex flex-col gap-3 p-3.5 bg-[#0a0d14]/90 backdrop-blur-md border border-[#181d2a] hover:border-[#0091ff]/40 rounded-xl transition-colors select-none">
      {/* Header with status badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu size={16} className="text-[#0091ff]" />
          <span className="text-xs font-bold text-white tracking-wide uppercase">
            Active ONNX Neural Model
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-[10px] font-semibold">
          <CheckCircle2 size={11} />
          <span>TensorRT Ready</span>
        </div>
      </div>

      {/* Model Spec Grid */}
      {modelInfo && (
        <div className="grid grid-cols-2 gap-2 bg-[#10141f] p-2.5 rounded-lg border border-[#1c2233] text-xs">
          <div className="flex flex-col gap-0.5">
            <span className="text-[#64748b] text-[10px]">Loaded Model</span>
            <span className="text-white font-mono font-medium truncate" title={modelInfo.filePath}>
              {modelInfo.fileName}
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[#64748b] text-[10px]">Model Size</span>
            <span className="text-[#0091ff] font-mono font-semibold">
              {modelInfo.fileSizeFormatted}
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[#64748b] text-[10px]">Input Tensor</span>
            <span className="text-[#cbd5e1] font-mono text-[11px] truncate">
              {modelInfo.inputShape}
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[#64748b] text-[10px]">Output Shape</span>
            <span className="text-[#cbd5e1] font-mono text-[11px] truncate">
              {modelInfo.outputShape}
            </span>
          </div>
        </div>
      )}

      {/* Drag and Drop Zone & Buttons */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`p-3 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
          isDragging
            ? 'border-[#0091ff] bg-[#0091ff]/10 shadow-[0_0_15px_rgba(0,145,255,0.3)]'
            : 'border-[#1e2538] hover:border-[#0091ff]/50 bg-[#0e121b]'
        }`}
        onClick={handlePickFile}
      >
        <UploadCloud size={22} className={isDragging ? 'text-[#0091ff]' : 'text-[#64748b]'} />
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold text-white">
            {isLoading ? 'Reading ONNX Graph...' : 'Select or Drop a .onnx File'}
          </span>
          <span className="text-[10px] text-[#64748b]">
            Supports YOLOv8, YOLOv9, Faster-RCNN, Custom ONNX weights
          </span>
        </div>
      </div>

      {/* Footer Controls: Benchmark & Default Reload */}
      <div className="flex items-center justify-between pt-1">
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleRunBenchmark();
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141824] hover:bg-[#1a2030] text-[#cbd5e1] hover:text-white border border-[#202738] rounded-md text-xs font-medium cursor-pointer transition-colors"
        >
          <Zap size={13} className={benchmarkActive ? 'text-[#eab308] animate-spin' : 'text-[#0091ff]'} />
          <span>
            {benchmarkActive
              ? 'Benchmarking...'
              : benchFps
              ? `Benchmark: ${benchFps} FPS (${modelInfo?.estimatedLatencyMs}ms)`
              : 'Benchmark Inference'}
          </span>
        </motion.button>

        <button
          type="button"
          onClick={async (e) => {
            e.stopPropagation();
            playClick();
            const sample = await loadDefaultSampleModel();
            setModelInfo(sample);
            playToggle(true);
          }}
          className="flex items-center gap-1 text-[10px] text-[#64748b] hover:text-[#0091ff] transition-colors cursor-pointer"
          title="Reload models/raven_detector.onnx"
        >
          <RefreshCw size={11} />
          <span>Reset to default .onnx</span>
        </button>
      </div>
    </div>
  );
};
