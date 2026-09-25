"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { IoSparklesOutline } from "react-icons/io5";

const COLOR_PALETTES = {
  lime: { primary: "#D3FD50", secondary: "#10B981", bgGlow: "rgba(211,253,80,0.15)", label: "ELECTRIC LIME" },
  violet: { primary: "#C084FC", secondary: "#9333EA", bgGlow: "rgba(192,132,252,0.15)", label: "CYBER VIOLET" },
  cyan: { primary: "#22D3EE", secondary: "#0284C7", bgGlow: "rgba(34,211,238,0.15)", label: "QUANTUM CYAN" },
  amber: { primary: "#FBBF24", secondary: "#D97706", bgGlow: "rgba(251,191,36,0.15)", label: "PLASMA AMBER" },
};

const NODES_DATA = [
  { id: "gemini", name: "GEMINI AI PIPELINE", stat: "14ms Avg Response", arch: "Google Gemini 2.5 Flash API" },
  { id: "turbopack", name: "NEXT.JS 16 CORE", stat: "4.1s Optimized Build", arch: "Turbopack App Router" },
  { id: "ast", name: "AST REFACTOR ENGINE", stat: "1,450 Tokens/Sec", arch: "Node.js + Babel Parser" },
  { id: "security", name: "CLERK + STRIPE VAULT", stat: "99.99% Verification", arch: "TLS 1.3 Webhooks" },
];

const HolographicQuantumCore = () => {
  const mountRef = useRef(null);
  const [paletteKey, setPaletteKey] = useState("lime");
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [activeNode, setActiveNode] = useState(NODES_DATA[0]);

  // Keep live references to Three.js elements for dynamic updates without re-instantiation
  const threeRef = useRef({
    scene: null,
    renderer: null,
    coreGroup: null,
    innerCore: null,
    outerRings: [],
    particlesMesh: null,
    materials: [],
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false },
    speed: 1.0,
  });

  threeRef.current.speed = speedMultiplier;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    threeRef.current.scene = scene;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);
    threeRef.current.renderer = renderer;

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(new THREE.Color(COLOR_PALETTES[paletteKey].primary), 2.5, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 3. Central Quantum Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);
    threeRef.current.coreGroup = coreGroup;

    // Inner glowing icosahedron wireframe
    const innerGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(COLOR_PALETTES[paletteKey].primary),
      wireframe: true,
      emissive: new THREE.Color(COLOR_PALETTES[paletteKey].secondary),
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);
    threeRef.current.innerCore = innerMesh;
    threeRef.current.materials.push(innerMat);

    // Solid inner quantum nucleus
    const nucleusGeo = new THREE.OctahedronGeometry(0.7, 0);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: false,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleusMesh);

    // Concentric Gimbal Rings
    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(COLOR_PALETTES[paletteKey].primary),
      wireframe: true,
      roughness: 0.3,
    });
    threeRef.current.materials.push(ringMat);

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.03, 16, 100), ringMat);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.03, 16, 100), ringMat);
    ring2.rotation.x = Math.PI / 2;
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.9, 0.03, 16, 100), ringMat);
    ring3.rotation.y = Math.PI / 3;

    coreGroup.add(ring1);
    coreGroup.add(ring2);
    coreGroup.add(ring3);
    threeRef.current.outerRings = [ring1, ring2, ring3];

    // Surrounding Particle Flux Cloud
    const particleCount = 500;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 3.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(COLOR_PALETTES[paletteKey].primary),
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });
    threeRef.current.materials.push(particleMat);

    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);
    threeRef.current.particlesMesh = particleMesh;

    // Mouse orbital controls
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      threeRef.current.mouse.targetX = x * 1.5;
      threeRef.current.mouse.targetY = y * 1.5;
    };

    container.addEventListener("mousemove", onMouseMove);

    // Window Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      const sp = threeRef.current.speed;
      const m = threeRef.current.mouse;

      // Inertial damping towards mouse
      m.x += (m.targetX - m.x) * 0.05;
      m.y += (m.targetY - m.y) * 0.05;

      coreGroup.rotation.y += 0.008 * sp;
      coreGroup.rotation.x += 0.005 * sp;

      // Apply mouse tilt
      coreGroup.rotation.y += (m.x * 0.5 - coreGroup.rotation.y * 0.05);
      coreGroup.rotation.x += (-m.y * 0.5 - coreGroup.rotation.x * 0.05);

      ring1.rotation.z += 0.012 * sp;
      ring2.rotation.y += 0.01 * sp;
      ring3.rotation.x -= 0.008 * sp;

      particleMesh.rotation.y -= 0.002 * sp;
      particleMesh.rotation.x += 0.001 * sp;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [paletteKey]);

  // Update theme colors dynamically
  const handleColorChange = (key) => {
    setPaletteKey(key);
    const pal = COLOR_PALETTES[key];
    const color = new THREE.Color(pal.primary);
    const secColor = new THREE.Color(pal.secondary);

    threeRef.current.materials.forEach((mat) => {
      if (mat.color) mat.color = color;
      if (mat.emissive) mat.emissive = secColor;
    });
  };

  return (
    <div id="quantum-core" className="w-full flex flex-col gap-6">
      {/* Interactive Controls & Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-white/15 bg-neutral-950/80 backdrop-blur-md">
        {/* Color Palette Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-white/50 uppercase tracking-widest mr-1 flex items-center gap-1.5">
            <IoSparklesOutline className="text-[#D3FD50]" />
            PALETTE:
          </span>
          {Object.keys(COLOR_PALETTES).map((k) => (
            <button
              key={k}
              onClick={() => handleColorChange(k)}
              className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                paletteKey === k
                  ? "bg-white text-black font-bold shadow-lg"
                  : "border border-white/15 bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              {k.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Speed Slider */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
            CLOCK: <strong className="text-white font-mono">{speedMultiplier.toFixed(1)}x</strong>
          </span>
          <input
            type="range"
            min="0.2"
            max="3.0"
            step="0.1"
            value={speedMultiplier}
            onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
            className="w-24 sm:w-32 accent-[#D3FD50] cursor-pointer"
          />
        </div>
      </div>

      {/* 3D WebGL Canvas Stage */}
      <div className="relative w-full h-[450px] sm:h-[500px] md:h-[560px] rounded-3xl border border-white/20 overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#060606] to-black shadow-2xl flex items-center justify-center">
        {/* Three.js container */}
        <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating Architecture Node Selectors (Bottom Right Overlay) */}
        <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4 pointer-events-none select-none">
          {/* Active Node Info HUD */}
          <div className="p-4 rounded-2xl border border-white/15 bg-black/80 backdrop-blur-md max-w-sm pointer-events-auto">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D3FD50] block">
              ✦ CORE NODE TELEMETRY
            </span>
            <h5 className="font-[font2] font-black text-lg text-white uppercase tracking-tight mt-0.5">
              {activeNode.name}
            </h5>
            <div className="flex items-center gap-3 mt-1.5 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">
                {activeNode.stat}
              </span>
              <span className="text-white/60 truncate">{activeNode.arch}</span>
            </div>
          </div>

          {/* Node Switcher Pills */}
          <div className="flex flex-wrap gap-2 pointer-events-auto">
            {NODES_DATA.map((node) => (
              <button
                key={node.id}
                onClick={() => setActiveNode(node)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeNode.id === node.id
                    ? "bg-[#D3FD50] text-black font-bold shadow-[0_0_15px_rgba(211,253,80,0.3)]"
                    : "border border-white/20 bg-black/60 text-white/70 hover:border-white/50"
                }`}
              >
                {node.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Ambient Top Hint */}
        <div className="absolute top-4 left-4 text-[11px] font-mono tracking-widest text-white/40 uppercase pointer-events-none">
          MOVE MOUSE TO ORBIT 3D CORE
        </div>
      </div>
    </div>
  );
};

export default HolographicQuantumCore;
