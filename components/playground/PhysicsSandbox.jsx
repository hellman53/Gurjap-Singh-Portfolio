"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { IoSparklesOutline, IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";

const TECH_BADGES = [
  { name: "Next.js 16", color: "#ffffff", border: "#ffffff", category: "Framework" },
  { name: "Gemini AI", color: "#60A5FA", border: "#3B82F6", category: "AI & ML" },
  { name: "React 19", color: "#38BDF8", border: "#0284C7", category: "Frontend" },
  { name: "Node.js", color: "#4ADE80", border: "#22C55E", category: "Backend" },
  { name: "TypeScript", color: "#93C5FD", border: "#2563EB", category: "Language" },
  { name: "Tailwind CSS", color: "#38BDF8", border: "#06B6D4", category: "Styling" },
  { name: "MongoDB Atlas", color: "#4ADE80", border: "#16A34A", category: "Database" },
  { name: "Stripe Checkout", color: "#C084FC", border: "#9333EA", category: "Payments" },
  { name: "Docker", color: "#60A5FA", border: "#2563EB", category: "DevOps" },
  { name: "GSAP Animation", color: "#D3FD50", border: "#D3FD50", category: "Motion" },
  { name: "Clerk Auth", color: "#F472B6", border: "#DB2777", category: "Identity" },
  { name: "Express.js", color: "#FBBF24", border: "#D97706", category: "API" },
];

const PhysicsSandbox = () => {
  const canvasRef = useRef(null);
  const [gravityMode, setGravityMode] = useState("zero-g"); // 'zero-g', 'earth', 'inverted', 'black-hole'
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef(null);

  // Play subtle synthesis blip on collision using Web Audio API
  const playCollisionBlip = useCallback((freq = 440) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // AudioContext unavailable or blocked
    }
  }, [soundEnabled]);

  // Physics simulation state stored in refs for 60fps canvas performance
  const stateRef = useRef({
    particles: [],
    sparkles: [],
    draggedItem: null,
    dragOffset: { x: 0, y: 0 },
    mouse: { x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0, isDown: false },
    width: 0,
    height: 0,
  });

  // Disperse badges with random velocities
  const disperse = useCallback(() => {
    const { particles, width, height } = stateRef.current;
    if (!particles.length) return;
    particles.forEach((p) => {
      p.vx = (Math.random() - 0.5) * 16;
      p.vy = (Math.random() - 0.5) * 16;
      p.x = Math.max(p.w, Math.min(width - p.w, p.x + (Math.random() - 0.5) * 60));
      p.y = Math.max(p.h, Math.min(height - p.h, p.y + (Math.random() - 0.5) * 60));
    });
    playCollisionBlip(600);
  }, [playCollisionBlip]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;

    // Resize canvas to match display size with HiDPI support
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      stateRef.current.width = rect.width;
      stateRef.current.height = rect.height;

      // Initialize particles if empty
      if (stateRef.current.particles.length === 0) {
        stateRef.current.particles = TECH_BADGES.map((badge, i) => {
          const w = 135;
          const h = 42;
          const cols = Math.max(2, Math.floor(rect.width / (w + 30)));
          const row = Math.floor(i / cols);
          const col = i % cols;
          return {
            ...badge,
            x: 50 + col * (w + 25) + Math.random() * 20,
            y: 50 + row * (h + 30) + Math.random() * 20,
            w,
            h,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            radius: 20,
            glowAlpha: 0,
          };
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse & Touch Listeners
    const onMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      stateRef.current.mouse.isDown = true;
      stateRef.current.mouse.x = x;
      stateRef.current.mouse.y = y;

      // Find clicked particle
      const { particles } = stateRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (
          x >= p.x - p.w / 2 &&
          x <= p.x + p.w / 2 &&
          y >= p.y - p.h / 2 &&
          y <= p.y + p.h / 2
        ) {
          stateRef.current.draggedItem = p;
          stateRef.current.dragOffset = { x: x - p.x, y: y - p.y };
          p.vx = 0;
          p.vy = 0;
          p.glowAlpha = 1;
          playCollisionBlip(520);
          break;
        }
      }
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const m = stateRef.current.mouse;
      m.vx = x - m.lastX;
      m.vy = y - m.lastY;
      m.lastX = x;
      m.lastY = y;
      m.x = x;
      m.y = y;

      if (stateRef.current.draggedItem) {
        const p = stateRef.current.draggedItem;
        p.x = x - stateRef.current.dragOffset.x;
        p.y = y - stateRef.current.dragOffset.y;
        p.vx = m.vx * 0.8;
        p.vy = m.vy * 0.8;
      }
    };

    const onMouseUp = () => {
      if (stateRef.current.draggedItem) {
        const p = stateRef.current.draggedItem;
        p.vx = stateRef.current.mouse.vx * 0.7;
        p.vy = stateRef.current.mouse.vy * 0.7;
        stateRef.current.draggedItem = null;
      }
      stateRef.current.mouse.isDown = false;
    };

    // Touch Support
    const onTouchStart = (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        onMouseDown({ clientX: t.clientX, clientY: t.clientY });
      }
    };
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        onMouseMove({ clientX: t.clientX, clientY: t.clientY });
      }
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);

    // Main 60fps Physics & Render Loop
    const loop = () => {
      const { width, height, particles, sparkles, draggedItem, mouse } = stateRef.current;
      ctx.clearRect(0, 0, width, height);

      // Draw faint cybernetic coordinate grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
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

      // Physics constants based on mode
      let gx = 0;
      let gy = 0;
      let friction = 0.992;

      if (gravityMode === "earth") {
        gy = 0.28;
        friction = 0.985;
      } else if (gravityMode === "inverted") {
        gy = -0.25;
        friction = 0.985;
      }

      // Update and draw sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.035;
        if (s.life <= 0) {
          sparkles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, s.life);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Update Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p !== draggedItem) {
          // Black hole attraction mode
          if (gravityMode === "black-hole" && mouse.x > 0 && mouse.y > 0) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 30) {
              const force = Math.min(1.2, 280 / (dist + 50));
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
              // Swirling tangent force
              p.vx += (-dy / dist) * 0.4;
              p.vy += (dx / dist) * 0.4;
            }
          }

          p.vx += gx;
          p.vy += gy;
          p.vx *= friction;
          p.vy *= friction;
          p.x += p.vx;
          p.y += p.vy;

          // Wall Collisions
          const halfW = p.w / 2;
          const halfH = p.h / 2;
          const restitution = 0.75;

          let hitWall = false;
          if (p.x - halfW < 0) {
            p.x = halfW;
            p.vx = -p.vx * restitution;
            hitWall = true;
          } else if (p.x + halfW > width) {
            p.x = width - halfW;
            p.vx = -p.vx * restitution;
            hitWall = true;
          }

          if (p.y - halfH < 0) {
            p.y = halfH;
            p.vy = -p.vy * restitution;
            hitWall = true;
          } else if (p.y + halfH > height) {
            p.y = height - halfH;
            p.vy = -p.vy * restitution;
            hitWall = true;
          }

          if (hitWall && Math.hypot(p.vx, p.vy) > 1.5) {
            p.glowAlpha = 0.8;
            playCollisionBlip(380 + Math.random() * 200);
            for (let k = 0; k < 4; k++) {
              sparkles.push({
                x: p.x,
                y: p.y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                color: p.border,
                size: Math.random() * 2.5 + 1,
                life: 1,
              });
            }
          }
        }

        // Particle-to-Particle Collisions (Elastic Bounding Box)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const minDistX = (p.w + p2.w) / 2;
          const minDistY = (p.h + p2.h) / 2;

          if (Math.abs(dx) < minDistX && Math.abs(dy) < minDistY) {
            const overlapX = minDistX - Math.abs(dx);
            const overlapY = minDistY - Math.abs(dy);

            if (overlapX < overlapY) {
              const sep = overlapX / 2;
              if (dx > 0) {
                if (p !== draggedItem) p.x -= sep;
                if (p2 !== draggedItem) p2.x += sep;
              } else {
                if (p !== draggedItem) p.x += sep;
                if (p2 !== draggedItem) p2.x -= sep;
              }
              const tempVx = p.vx;
              p.vx = p2.vx * 0.8;
              p2.vx = tempVx * 0.8;
            } else {
              const sep = overlapY / 2;
              if (dy > 0) {
                if (p !== draggedItem) p.y -= sep;
                if (p2 !== draggedItem) p2.y += sep;
              } else {
                if (p !== draggedItem) p.y += sep;
                if (p2 !== draggedItem) p2.y -= sep;
              }
              const tempVy = p.vy;
              p.vy = p2.vy * 0.8;
              p2.vy = tempVy * 0.8;
            }

            p.glowAlpha = 0.9;
            p2.glowAlpha = 0.9;
            if (Math.hypot(p.vx, p.vy) > 1.2) {
              playCollisionBlip(480 + Math.random() * 160);
              for (let k = 0; k < 3; k++) {
                sparkles.push({
                  x: (p.x + p2.x) / 2,
                  y: (p.y + p2.y) / 2,
                  vx: (Math.random() - 0.5) * 4,
                  vy: (Math.random() - 0.5) * 4,
                  color: p.color,
                  size: 2,
                  life: 0.9,
                });
              }
            }
          }
        }

        // Decay glow
        if (p.glowAlpha > 0) {
          p.glowAlpha -= 0.02;
        }

        // Render Badge Capsule
        const halfW = p.w / 2;
        const halfH = p.h / 2;
        const rad = p.radius;

        ctx.save();
        ctx.translate(p.x, p.y);

        // Ambient Glow shadow
        if (p.glowAlpha > 0 || p === draggedItem) {
          ctx.shadowColor = p.border;
          ctx.shadowBlur = p === draggedItem ? 24 : 16 * p.glowAlpha;
        }

        // Draw Rounded Badge Body
        ctx.beginPath();
        ctx.roundRect(-halfW, -halfH, p.w, p.h, rad);
        ctx.fillStyle = p === draggedItem ? "#1a1a1a" : "#0d0d0d";
        ctx.fill();

        // Border
        ctx.lineWidth = p === draggedItem ? 2.5 : 1.5;
        ctx.strokeStyle = p === draggedItem ? "#D3FD50" : p.border;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Tech Label Typography
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 13px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.name, 0, -2);

        // Category Subtext
        ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
        ctx.font = "9px monospace";
        ctx.fillText(p.category.toUpperCase(), 0, 10);

        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [gravityMode, playCollisionBlip]);

  return (
    <div id="physics-sandbox" className="w-full flex flex-col gap-6">
      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-white/15 bg-neutral-950/80 backdrop-blur-md">
        {/* Left: Mode Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-white/50 uppercase tracking-widest mr-2 flex items-center gap-1.5">
            <IoSparklesOutline className="text-[#D3FD50]" />
            GRAVITY:
          </span>
          {[
            { id: "zero-g", label: "ZERO-G" },
            { id: "earth", label: "EARTH" },
            { id: "inverted", label: "INVERTED" },
            { id: "black-hole", label: "BLACK HOLE" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setGravityMode(mode.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                gravityMode === mode.id
                  ? "bg-[#D3FD50] text-black font-bold shadow-[0_0_15px_rgba(211,253,80,0.3)]"
                  : "border border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Right: Actions (Disperse, Sound Toggle) */}
        <div className="flex items-center gap-3">
          <button
            onClick={disperse}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 hover:border-[#D3FD50] hover:text-[#D3FD50] text-xs font-mono tracking-wider uppercase text-white transition-all cursor-pointer"
          >
            <FiRefreshCw className="text-xs" />
            <span>DISPERSE</span>
          </button>

          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            aria-label="Toggle sound"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
              soundEnabled
                ? "border-[#D3FD50] text-[#D3FD50] bg-[#D3FD50]/10"
                : "border-white/15 text-white/40 hover:text-white"
            }`}
          >
            {soundEnabled ? <IoVolumeHighOutline className="text-base" /> : <IoVolumeMuteOutline className="text-base" />}
            <span className="hidden sm:inline">{soundEnabled ? "SFX ON" : "SFX MUTED"}</span>
          </button>
        </div>
      </div>

      {/* Physics Canvas Area */}
      <div className="relative w-full h-[450px] sm:h-[520px] md:h-[600px] rounded-3xl border border-white/20 overflow-hidden bg-gradient-to-b from-[#0e0e0e] via-[#090909] to-[#040404] shadow-2xl">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing block"
        />

        {/* Floating Instruction Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono tracking-widest text-white/40 uppercase pointer-events-none select-none">
          <span>CLICK & DRAG BADGES • FLING TO THROW</span>
          <span className="hidden sm:inline">MODE: {gravityMode.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default PhysicsSandbox;
