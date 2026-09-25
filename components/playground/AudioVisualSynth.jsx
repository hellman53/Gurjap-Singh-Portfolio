"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";

// Pentatonic Minor scale frequencies (musical notes that always sound harmonic & melodic)
const SCALE_FREQS = [
  110.0,  // A2
  130.81, // C3
  146.83, // D3
  164.81, // E3
  196.0,  // G3
  220.0,  // A3
  261.63, // C4
  293.66, // D4
  329.63, // E4
  392.0,  // G4
  440.0,  // A4
  523.25, // C5
];

const PRESETS = {
  synthwave: { type: "sawtooth", filterQ: 8, label: "CYBERPUNK SYNTH" },
  chiptune: { type: "square", filterQ: 3, label: "8-BIT CHIPTUNE" },
  ambient: { type: "sine", filterQ: 1, label: "COSMIC AMBIENT" },
};

const AudioVisualSynth = () => {
  const canvasRef = useRef(null);
  const [presetKey, setPresetKey] = useState("synthwave");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeFrequency, setActiveFrequency] = useState(220);

  const audioStateRef = useRef({
    ctx: null,
    osc: null,
    filter: null,
    gain: null,
    analyser: null,
    isStarted: false,
  });

  // Initialize or resume Web Audio engine
  const ensureAudio = useCallback(() => {
    if (isMuted) return;
    try {
      if (!audioStateRef.current.ctx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContextClass();

        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        const analyser = ctx.createAnalyser();

        analyser.fftSize = 512;
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1200, ctx.currentTime);
        filter.Q.setValueAtTime(PRESETS[presetKey].filterQ, ctx.currentTime);

        osc.type = PRESETS[presetKey].type;
        osc.frequency.setValueAtTime(220, ctx.currentTime);

        gain.gain.setValueAtTime(0.0001, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(analyser);
        analyser.connect(ctx.destination);

        osc.start();

        audioStateRef.current = {
          ctx,
          osc,
          filter,
          gain,
          analyser,
          isStarted: true,
        };
      } else if (audioStateRef.current.ctx.state === "suspended") {
        audioStateRef.current.ctx.resume();
      }
    } catch {
      // Audio engine restricted
    }
  }, [isMuted, presetKey]);

  // Update Synth Frequency & Filter based on normalized coordinate
  const triggerTone = useCallback((normX, normY) => {
    ensureAudio();
    const { ctx, osc, filter, gain } = audioStateRef.current;
    if (!ctx || !osc || !gain || isMuted) return;

    // Pick closest harmonic note from scale based on horizontal position
    const scaleIndex = Math.min(
      SCALE_FREQS.length - 1,
      Math.max(0, Math.floor(normX * SCALE_FREQS.length))
    );
    const targetFreq = SCALE_FREQS[scaleIndex];
    setActiveFrequency(Math.round(targetFreq));

    // Smoothly ramp frequency (portamento effect)
    osc.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.03);

    // Vertical position controls filter cutoff (sweeping resonant filter)
    const cutoff = 200 + (1 - normY) * 3500;
    filter.frequency.setTargetAtTime(cutoff, ctx.currentTime, 0.05);

    // Ramp gain up smoothly
    gain.gain.setTargetAtTime(0.09, ctx.currentTime, 0.02);
    setIsPlaying(true);
  }, [ensureAudio, isMuted]);

  const releaseTone = useCallback(() => {
    const { ctx, gain } = audioStateRef.current;
    if (ctx && gain) {
      gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.08);
    }
    setIsPlaying(false);
  }, []);

  // Preset Switcher
  const handlePresetChange = (key) => {
    setPresetKey(key);
    const { osc, filter, ctx } = audioStateRef.current;
    if (osc && filter && ctx) {
      osc.type = PRESETS[key].type;
      filter.Q.setTargetAtTime(PRESETS[key].filterQ, ctx.currentTime, 0.05);
    }
  };

  // Real-time Canvas Waveform Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    let animId;

    const renderWave = () => {
      const { width, height } = canvas;
      ctx2d.clearRect(0, 0, width, height);

      // Faint cyber grid
      ctx2d.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx2d.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx2d.beginPath();
        ctx2d.moveTo(x, 0);
        ctx2d.lineTo(x, height);
        ctx2d.stroke();
      }

      const { analyser } = audioStateRef.current;

      if (analyser && isPlaying && !isMuted) {
        const bufferLength = analyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        // Draw glowing audio waveform
        ctx2d.lineWidth = 3;
        ctx2d.strokeStyle = "#D3FD50";
        ctx2d.shadowColor = "#D3FD50";
        ctx2d.shadowBlur = 15;
        ctx2d.beginPath();

        const sliceWidth = (width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx2d.moveTo(x, y);
          } else {
            ctx2d.lineTo(x, y);
          }

          x += sliceWidth;
        }

        ctx2d.lineTo(width, height / 2);
        ctx2d.stroke();
        ctx2d.shadowBlur = 0;
      } else {
        // Flat resting baseline with subtle idle pulse
        ctx2d.strokeStyle = "rgba(211, 253, 80, 0.25)";
        ctx2d.lineWidth = 1.5;
        ctx2d.beginPath();
        ctx2d.moveTo(0, height / 2);
        ctx2d.lineTo(width, height / 2);
        ctx2d.stroke();
      }

      animId = requestAnimationFrame(renderWave);
    };

    animId = requestAnimationFrame(renderWave);

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isMuted]);

  // Pointer Interaction Handlers
  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    triggerTone(x, y);
  };

  return (
    <div id="audio-synth" className="w-full flex flex-col gap-6">
      {/* Synth Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-white/15 bg-neutral-950/80 backdrop-blur-md">
        {/* Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-white/50 uppercase tracking-widest mr-1">
            PRESET:
          </span>
          {Object.keys(PRESETS).map((k) => (
            <button
              key={k}
              onClick={() => handlePresetChange(k)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                presetKey === k
                  ? "bg-[#D3FD50] text-black font-bold shadow-[0_0_15px_rgba(211,253,80,0.3)]"
                  : "border border-white/10 bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              {PRESETS[k].label}
            </button>
          ))}
        </div>

        {/* Telemetry & Mute Button */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-white/60">
            <span>FREQ:</span>
            <strong className="text-[#D3FD50]">{activeFrequency} HZ</strong>
          </div>

          <button
            onClick={() => {
              if (!isMuted) releaseTone();
              setIsMuted((prev) => !prev);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              isMuted
                ? "border-white/15 text-white/40"
                : "border-[#D3FD50] text-[#D3FD50] bg-[#D3FD50]/10"
            }`}
          >
            {isMuted ? <IoVolumeMuteOutline className="text-base" /> : <IoVolumeHighOutline className="text-base" />}
            <span>{isMuted ? "MUTED" : "AUDIO ON"}</span>
          </button>
        </div>
      </div>

      {/* Interactive Soundpad & Oscilloscope Surface */}
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={releaseTone}
        onPointerDown={handlePointerMove}
        onPointerUp={releaseTone}
        className="relative w-full h-[400px] sm:h-[460px] rounded-3xl border border-white/20 overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-black shadow-2xl cursor-crosshair select-none flex items-center justify-center group"
      >
        {/* Live Audio Waveform Canvas */}
        <canvas
          ref={canvasRef}
          width={900}
          height={400}
          className="w-full h-full block pointer-events-none"
        />

        {/* Center Guidance Hint */}
        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none text-center p-6">
            <span className="font-[font2] font-black text-2xl sm:text-3xl uppercase tracking-wider text-white/90">
              MOVE MOUSE OR TAP PAD
            </span>
            <span className="font-mono text-xs text-white/50 tracking-widest uppercase">
              X-AXIS: PENTATONIC PITCH • Y-AXIS: RESONANT FILTER CUTOFF
            </span>
          </div>
        )}

        {/* Active frequency readout pill (bottom left) */}
        {isPlaying && (
          <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/80 border border-[#D3FD50]/50 text-xs font-mono text-[#D3FD50] tracking-widest uppercase pointer-events-none animate-pulse">
            OSC: {activeFrequency} Hz // FILTER CUTOFF ENGAGED
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioVisualSynth;
