"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  FiRefreshCw,
  FiUser,
  FiCpu,
  FiZap,
  FiVolume2,
  FiVolumeX,
  FiAward,
  FiRotateCcw,
} from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";

// Winning combinations for 3x3 grid
const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6],             // Diagonals
];

// Color Themes
const THEMES = {
  neon: {
    id: "neon",
    name: "CYBER NEON",
    dotX: "#00F0FF",
    dotO: "#FF007F",
    xColor: "#00F0FF",
    xGlow: "rgba(0, 240, 255, 0.6)",
    xGradient: "from-cyan-400 to-blue-500",
    xText: "text-cyan-400",
    xBorder: "border-cyan-400",
    xBg: "bg-cyan-500/10",
    oColor: "#FF007F",
    oGlow: "rgba(255, 0, 127, 0.6)",
    oGradient: "from-pink-500 to-rose-400",
    oText: "text-pink-400",
    oBorder: "border-pink-400",
    oBg: "bg-pink-500/10",
    accent: "#D3FD50",
    accentGlow: "rgba(211, 253, 80, 0.5)",
    boardBorder: "border-cyan-500/20",
    containerBg: "from-cyan-950/20 via-black to-pink-950/20",
    gridLine: "border-white/10",
    lineStroke: "#00F0FF",
  },
  acid: {
    id: "acid",
    name: "ELECTRIC ACID",
    dotX: "#D3FD50",
    dotO: "#A855F7",
    xColor: "#D3FD50",
    xGlow: "rgba(211, 253, 80, 0.6)",
    xGradient: "from-lime-400 to-emerald-400",
    xText: "text-[#D3FD50]",
    xBorder: "border-[#D3FD50]",
    xBg: "bg-[#D3FD50]/10",
    oColor: "#A855F7",
    oGlow: "rgba(168, 85, 247, 0.6)",
    oGradient: "from-purple-500 to-fuchsia-400",
    oText: "text-purple-400",
    oBorder: "border-purple-400",
    oBg: "bg-purple-500/10",
    accent: "#06B6D4",
    accentGlow: "rgba(6, 182, 212, 0.5)",
    boardBorder: "border-lime-500/20",
    containerBg: "from-lime-950/20 via-black to-purple-950/20",
    gridLine: "border-white/10",
    lineStroke: "#D3FD50",
  },
  sunset: {
    id: "sunset",
    name: "SUNSET SYNTH",
    dotX: "#FF5722",
    dotO: "#FACC15",
    xColor: "#FF5722",
    xGlow: "rgba(255, 87, 34, 0.6)",
    xGradient: "from-orange-500 to-amber-400",
    xText: "text-orange-400",
    xBorder: "border-orange-400",
    xBg: "bg-orange-500/10",
    oColor: "#FACC15",
    oGlow: "rgba(250, 204, 21, 0.6)",
    oGradient: "from-yellow-400 to-amber-200",
    oText: "text-yellow-400",
    oBorder: "border-yellow-400",
    oBg: "bg-yellow-500/10",
    accent: "#EC4899",
    accentGlow: "rgba(236, 72, 153, 0.5)",
    boardBorder: "border-orange-500/20",
    containerBg: "from-orange-950/20 via-black to-yellow-950/20",
    gridLine: "border-white/10",
    lineStroke: "#FF5722",
  },
  matrix: {
    id: "matrix",
    name: "COSMIC MATRIX",
    dotX: "#10B981",
    dotO: "#38BDF8",
    xColor: "#10B981",
    xGlow: "rgba(16, 185, 129, 0.6)",
    xGradient: "from-emerald-400 to-teal-400",
    xText: "text-emerald-400",
    xBorder: "border-emerald-400",
    xBg: "bg-emerald-500/10",
    oColor: "#38BDF8",
    oGlow: "rgba(56, 189, 248, 0.6)",
    oGradient: "from-sky-400 to-indigo-400",
    oText: "text-sky-400",
    oBorder: "border-sky-400",
    oBg: "bg-sky-500/10",
    accent: "#2DD4BF",
    accentGlow: "rgba(45, 212, 191, 0.5)",
    boardBorder: "border-emerald-500/20",
    containerBg: "from-emerald-950/20 via-black to-sky-950/20",
    gridLine: "border-white/10",
    lineStroke: "#10B981",
  },
};

export default function TicTacToe() {
  // Game State
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X"); // 'X' starts
  const [winnerInfo, setWinnerInfo] = useState(null); // { winner: 'X'|'O'|'draw', line: [a,b,c]|null }
  const [gameMode, setGameMode] = useState("ai"); // 'ai' or 'pvp'
  const [difficulty, setDifficulty] = useState("hard"); // 'normal' or 'hard'
  const [currentTheme, setCurrentTheme] = useState("neon");
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });
  const [streak, setStreak] = useState(0);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const theme = THEMES[currentTheme] || THEMES.neon;
  const boardContainerRef = useRef(null);
  const boardRef = useRef(board);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  // Synchronize boardRef whenever board changes
  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  // Play Web Audio Chimes
  const playSound = useCallback(
    (type) => {
      if (!soundEnabled) return;
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
        }
        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        if (type === "place_x") {
          // Vibrant laser chirp
          osc.type = "sine";
          osc.frequency.setValueAtTime(520, now);
          osc.frequency.exponentialRampToValueAtTime(1040, now + 0.12);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.12);
        } else if (type === "place_o") {
          // Warm harmonic chime
          osc.type = "triangle";
          osc.frequency.setValueAtTime(330, now);
          osc.frequency.exponentialRampToValueAtTime(660, now + 0.14);
          gain.gain.setValueAtTime(0.09, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.14);
        } else if (type === "win") {
          // Major arpeggio celebration fanfare
          const notes = [523.25, 659.25, 783.99, 1046.5];
          notes.forEach((freq, idx) => {
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.type = "sine";
            o.frequency.setValueAtTime(freq, now + idx * 0.08);
            g.gain.setValueAtTime(0.07, now + idx * 0.08);
            g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.3);
            o.connect(g);
            g.connect(ctx.destination);
            o.start(now + idx * 0.08);
            o.stop(now + idx * 0.08 + 0.3);
          });
        } else if (type === "draw") {
          // Low mechanical draw tone
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.25);
        } else if (type === "reset") {
          // Digital swoosh
          osc.type = "sine";
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.15);
        }
      } catch {
        // Audio unavailable
      }
    },
    [soundEnabled]
  );

  // Check Game Outcome
  const checkWinner = useCallback((currentBoard) => {
    for (const [a, b, c] of WINNING_LINES) {
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a], line: [a, b, c] };
      }
    }
    if (currentBoard.every((cell) => cell !== null)) {
      return { winner: "draw", line: null };
    }
    return null;
  }, []);

  // Spawn Colorful Particles on Mark Placement or Win
  const spawnParticles = useCallback(
    (originX, originY, color, count = 28, speedMult = 1) => {
      const newParticles = [];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 4 + 2) * speedMult;
        newParticles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          size: Math.random() * 4 + 2,
          color,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.015,
          spin: (Math.random() - 0.5) * 0.2,
          angle: 0,
        });
      }
      particlesRef.current.push(...newParticles);
    },
    []
  );

  // Trigger celebration fireworks stream
  const triggerCelebrationFireworks = useCallback(
    (color) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const origins = [
        { x: rect.width * 0.25, y: rect.height * 0.3 },
        { x: rect.width * 0.5, y: rect.height * 0.5 },
        { x: rect.width * 0.75, y: rect.height * 0.3 },
      ];
      origins.forEach((pos, idx) => {
        setTimeout(() => {
          spawnParticles(pos.x, pos.y, color, 45, 1.3);
        }, idx * 120);
      });
    },
    [spawnParticles]
  );

  // Minimax Algorithm for AI
  const getBestMove = useCallback(
    (currentBoard) => {
      const available = currentBoard
        .map((val, idx) => (val === null ? idx : null))
        .filter((val) => val !== null);

      if (available.length === 0) return null;

      // Casual mode: 35% chance to play a random move
      if (difficulty === "normal" && Math.random() < 0.35) {
        return available[Math.floor(Math.random() * available.length)];
      }

      // First move optimization: take center or a corner
      if (available.length === 8) {
        if (currentBoard[4] === null) return 4;
        const corners = [0, 2, 6, 8];
        return corners[Math.floor(Math.random() * corners.length)];
      }

      const minimax = (tempBoard, isMaximizing, depth = 0) => {
        const outcome = checkWinner(tempBoard);
        if (outcome) {
          if (outcome.winner === "O") return 10 - depth;
          if (outcome.winner === "X") return depth - 10;
          if (outcome.winner === "draw") return 0;
        }

        if (isMaximizing) {
          let bestScore = -Infinity;
          for (let i = 0; i < 9; i++) {
            if (tempBoard[i] === null) {
              tempBoard[i] = "O";
              const score = minimax(tempBoard, false, depth + 1);
              tempBoard[i] = null;
              bestScore = Math.max(score, bestScore);
            }
          }
          return bestScore;
        } else {
          let bestScore = Infinity;
          for (let i = 0; i < 9; i++) {
            if (tempBoard[i] === null) {
              tempBoard[i] = "X";
              const score = minimax(tempBoard, true, depth + 1);
              tempBoard[i] = null;
              bestScore = Math.min(score, bestScore);
            }
          }
          return bestScore;
        }
      };

      let bestScore = -Infinity;
      let bestMove = available[0];
      const boardClone = [...currentBoard];

      for (const idx of available) {
        boardClone[idx] = "O";
        const score = minimax(boardClone, false, 0);
        boardClone[idx] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = idx;
        }
      }

      return bestMove;
    },
    [checkWinner, difficulty]
  );

  // Core Move Execution Engine
  const executeMove = useCallback(
    (index, playerSymbol, cellElement) => {
      const currentBoard = boardRef.current;
      if (currentBoard[index] !== null || winnerInfo) return;

      const newBoard = [...currentBoard];
      newBoard[index] = playerSymbol;
      boardRef.current = newBoard;
      setBoard(newBoard);

      // Play Sound
      playSound(playerSymbol === "X" ? "place_x" : "place_o");

      // Particle explosion at cell center
      if (cellElement && canvasRef.current) {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const cellRect = cellElement.getBoundingClientRect();
        const originX = cellRect.left - canvasRect.left + cellRect.width / 2;
        const originY = cellRect.top - canvasRect.top + cellRect.height / 2;
        const pColor = playerSymbol === "X" ? theme.xColor : theme.oColor;
        spawnParticles(originX, originY, pColor, 28);
      }

      // Check Outcome
      const result = checkWinner(newBoard);
      if (result) {
        setWinnerInfo(result);
        if (result.winner === "X") {
          setScores((s) => ({ ...s, x: s.x + 1 }));
          setStreak((prev) => prev + 1);
          playSound("win");
          triggerCelebrationFireworks(theme.xColor);
        } else if (result.winner === "O") {
          setScores((s) => ({ ...s, o: s.o + 1 }));
          setStreak(0);
          playSound("win");
          triggerCelebrationFireworks(theme.oColor);
        } else {
          setScores((s) => ({ ...s, draws: s.draws + 1 }));
          playSound("draw");
        }
      } else {
        setTurn(playerSymbol === "X" ? "O" : "X");
      }
    },
    [
      winnerInfo,
      playSound,
      theme,
      spawnParticles,
      checkWinner,
      triggerCelebrationFireworks,
    ]
  );

  // User Click Handler
  const handleUserClick = useCallback(
    (index, cellElement) => {
      if (
        boardRef.current[index] !== null ||
        winnerInfo ||
        isAiThinking ||
        (gameMode === "ai" && turn === "O")
      ) {
        return;
      }
      executeMove(index, turn, cellElement);
    },
    [winnerInfo, isAiThinking, gameMode, turn, executeMove]
  );

  // Trigger AI Turn without re-trigger loops or flickering
  useEffect(() => {
    if (gameMode !== "ai" || turn !== "O" || winnerInfo) {
      setIsAiThinking(false);
      return;
    }

    setIsAiThinking(true);
    const thinkDuration = 380; // snappy, realistic delay

    const timer = setTimeout(() => {
      setIsAiThinking(false);
      const currentBoard = boardRef.current;
      const aiMove = getBestMove(currentBoard);

      if (aiMove !== null) {
        const cellEl = boardContainerRef.current?.querySelector(`[data-cell="${aiMove}"]`);
        executeMove(aiMove, "O", cellEl);
      }
    }, thinkDuration);

    return () => clearTimeout(timer);
  }, [turn, gameMode, winnerInfo, getBestMove, executeMove]);

  // Particle Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Resize canvas to match container
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // subtle gravity
        p.alpha -= p.decay;
        p.angle += p.spin;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Reset Game
  const resetGame = () => {
    playSound("reset");
    const empty = Array(9).fill(null);
    boardRef.current = empty;
    setBoard(empty);
    setTurn("X");
    setWinnerInfo(null);
    setIsAiThinking(false);
  };

  // Reset All Stats
  const resetAllStats = () => {
    playSound("reset");
    resetGame();
    setScores({ x: 0, o: 0, draws: 0 });
    setStreak(0);
  };

  // Helper: calculate SVG laser line coordinates for winning 3 cells
  const getWinningLineCoordinates = () => {
    if (!winnerInfo?.line || !boardContainerRef.current) return null;
    const [a, , c] = winnerInfo.line;
    const cellA = boardContainerRef.current.querySelector(`[data-cell="${a}"]`);
    const cellC = boardContainerRef.current.querySelector(`[data-cell="${c}"]`);
    if (!cellA || !cellC) return null;

    const containerRect = boardContainerRef.current.getBoundingClientRect();
    const rectA = cellA.getBoundingClientRect();
    const rectC = cellC.getBoundingClientRect();

    const x1 = rectA.left - containerRect.left + rectA.width / 2;
    const y1 = rectA.top - containerRect.top + rectA.height / 2;
    const x2 = rectC.left - containerRect.left + rectC.width / 2;
    const y2 = rectC.top - containerRect.top + rectC.height / 2;

    return { x1, y1, x2, y2 };
  };

  const lineCoords = getWinningLineCoordinates();

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Main Game Card */}
      <div
        className={`w-full max-w-4xl rounded-3xl border ${theme.boardBorder} bg-gradient-to-b ${theme.containerBg} backdrop-blur-2xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden transition-colors duration-500`}
      >
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full blur-[100px] pointer-events-none opacity-40 transition-all duration-500"
          style={{ backgroundColor: turn === "X" ? theme.xColor : theme.oColor }}
        />

        {/* 2. Top Header Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
          {/* Left: Mode & Difficulty Selectors */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="inline-flex rounded-xl bg-white/5 border border-white/10 p-1">
              <button
                onClick={() => {
                  setGameMode("ai");
                  resetGame();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  gameMode === "ai"
                    ? "bg-[#D3FD50] text-black font-bold shadow-[0_0_12px_rgba(211,253,80,0.3)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <FiCpu className="text-sm" />
                <span>VS AI</span>
              </button>
              <button
                onClick={() => {
                  setGameMode("pvp");
                  resetGame();
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  gameMode === "pvp"
                    ? "bg-[#D3FD50] text-black font-bold shadow-[0_0_12px_rgba(211,253,80,0.3)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <FiUser className="text-sm" />
                <span>2-PLAYER</span>
              </button>
            </div>

            {gameMode === "ai" && (
              <div className="inline-flex rounded-xl bg-white/5 border border-white/10 p-1">
                <button
                  onClick={() => setDifficulty("normal")}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    difficulty === "normal"
                      ? "bg-white/20 text-white font-bold"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  CASUAL
                </button>
                <button
                  onClick={() => setDifficulty("hard")}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    difficulty === "hard"
                      ? "bg-red-500/30 text-red-300 font-bold border border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  IMPOSSIBLE
                </button>
              </div>
            )}
          </div>

          {/* Right: Sound & Theme Pills */}
          <div className="flex items-center gap-3">
            {/* Theme Selector Dropdown/Pills */}
            <div className="hidden sm:flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl p-1">
              {Object.values(THEMES).map((thm) => {
                const isSelected = currentTheme === thm.id;
                return (
                  <button
                    key={thm.id}
                    onClick={() => setCurrentTheme(thm.id)}
                    title={thm.name}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white/20 text-white font-bold border border-white/20"
                        : "text-white/40 hover:text-white/80"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: thm.dotX }}
                    />
                    <span
                      className="w-2 h-2 rounded-full -ml-0.5"
                      style={{ backgroundColor: thm.dotO }}
                    />
                    <span className="hidden md:inline ml-1">{thm.name.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled((prev) => !prev)}
              title={soundEnabled ? "Mute SFX" : "Enable SFX"}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                soundEnabled
                  ? "bg-white/10 border-white/20 text-[#D3FD50]"
                  : "bg-white/5 border-white/10 text-white/30 hover:text-white"
              }`}
            >
              {soundEnabled ? <FiVolume2 className="text-base" /> : <FiVolumeX className="text-base" />}
            </button>
          </div>
        </div>

        {/* 3. Live Scoreboard & Active Turn Telemetry */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 my-6 relative z-10">
          {/* Player X Card */}
          <div
            className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden ${
              turn === "X" && !winnerInfo
                ? `${theme.xBorder} bg-white/[0.06] shadow-[0_0_25px_${theme.xGlow}]`
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            {turn === "X" && !winnerInfo && (
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: theme.xColor }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: theme.xColor }}
                />
              </span>
            )}
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-white/60 mb-1">
              <span className={`font-bold ${theme.xText}`}>PLAYER X</span>
              <span className="hidden sm:inline text-white/30">
                ({gameMode === "ai" ? "YOU" : "P1"})
              </span>
            </div>
            <div
              className={`font-[font2] font-black text-3xl sm:text-5xl tracking-tight leading-none ${theme.xText}`}
              style={{ textShadow: `0 0 15px ${theme.xGlow}` }}
            >
              {scores.x}
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1">
              VICTORIES
            </span>
          </div>

          {/* Center VS / Status Badge */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:p-4 flex flex-col items-center justify-center text-center">
            {winnerInfo ? (
              <div className="flex flex-col items-center animate-bounce">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  MATCH RESULT
                </span>
                <span
                  className={`font-[font2] font-black text-lg sm:text-2xl uppercase tracking-wider mt-0.5 ${
                    winnerInfo.winner === "X"
                      ? theme.xText
                      : winnerInfo.winner === "O"
                      ? theme.oText
                      : "text-amber-400"
                  }`}
                >
                  {winnerInfo.winner === "draw"
                    ? "DRAW GAME"
                    : `${winnerInfo.winner} TAKES MATCH!`}
                </span>
              </div>
            ) : isAiThinking ? (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-[#D3FD50] text-xs font-mono tracking-widest animate-pulse">
                  <FiZap className="animate-spin" />
                  <span>AI THINKING</span>
                </div>
                <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[#D3FD50] animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  ACTIVE TURN
                </span>
                <span
                  className={`font-[font2] font-black text-xl sm:text-3xl uppercase tracking-wider mt-0.5 ${
                    turn === "X" ? theme.xText : theme.oText
                  }`}
                  style={{
                    textShadow: `0 0 12px ${turn === "X" ? theme.xGlow : theme.oGlow}`,
                  }}
                >
                  PLAYER {turn}
                </span>
              </div>
            )}

            {/* Streak Counter */}
            {streak > 1 && (
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono tracking-wider font-bold">
                <FiAward className="text-xs" />
                <span>{streak}X STREAK</span>
              </div>
            )}
            <div className="text-[10px] font-mono text-white/30 mt-1 uppercase tracking-widest">
              DRAWS: {scores.draws}
            </div>
          </div>

          {/* Player O Card */}
          <div
            className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden ${
              turn === "O" && !winnerInfo
                ? `${theme.oBorder} bg-white/[0.06] shadow-[0_0_25px_${theme.oGlow}]`
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            {turn === "O" && !winnerInfo && (
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: theme.oColor }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: theme.oColor }}
                />
              </span>
            )}
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-white/60 mb-1">
              <span className={`font-bold ${theme.oText}`}>PLAYER O</span>
              <span className="hidden sm:inline text-white/30">
                ({gameMode === "ai" ? "CYBER AI" : "P2"})
              </span>
            </div>
            <div
              className={`font-[font2] font-black text-3xl sm:text-5xl tracking-tight leading-none ${theme.oText}`}
              style={{ textShadow: `0 0 15px ${theme.oGlow}` }}
            >
              {scores.o}
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1">
              VICTORIES
            </span>
          </div>
        </div>

        {/* 4. Creative 2D Game Board Arena */}
        <div className="flex justify-center my-4 relative">
          <div
            ref={boardContainerRef}
            className="relative w-full max-w-[420px] aspect-square rounded-3xl p-3 sm:p-4 bg-black/60 border border-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-md"
          >
            {/* Particle Canvas Overlay */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none z-30 w-full h-full rounded-3xl"
            />

            {/* SVG Laser Line on Victory */}
            {lineCoords && (
              <svg className="absolute inset-0 pointer-events-none z-25 w-full h-full">
                <defs>
                  <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Glow under-layer */}
                <line
                  x1={lineCoords.x1}
                  y1={lineCoords.y1}
                  x2={lineCoords.x2}
                  y2={lineCoords.y2}
                  stroke={winnerInfo.winner === "X" ? theme.xColor : theme.oColor}
                  strokeWidth="10"
                  strokeLinecap="round"
                  opacity="0.6"
                  filter="url(#neon-glow)"
                />
                {/* Sharp core laser */}
                <line
                  x1={lineCoords.x1}
                  y1={lineCoords.y1}
                  x2={lineCoords.x2}
                  y2={lineCoords.y2}
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {/* 3x3 Interactive Grid Cells */}
            <div className="grid grid-cols-3 grid-rows-3 gap-2 sm:gap-3 w-full h-full">
              {board.map((cellValue, idx) => {
                const isWinningCell = winnerInfo?.line?.includes(idx);
                const isHovered =
                  hoveredCell === idx &&
                  !cellValue &&
                  !winnerInfo &&
                  !isAiThinking &&
                  !(gameMode === "ai" && turn === "O");

                const isCellDisabled =
                  Boolean(cellValue) ||
                  Boolean(winnerInfo) ||
                  isAiThinking ||
                  (gameMode === "ai" && turn === "O");

                return (
                  <button
                    key={idx}
                    data-cell={idx}
                    onClick={(e) => handleUserClick(idx, e.currentTarget)}
                    onMouseEnter={() => setHoveredCell(idx)}
                    onMouseLeave={() => setHoveredCell(null)}
                    disabled={isCellDisabled}
                    className={`relative rounded-2xl border transition-all duration-300 flex items-center justify-center select-none group overflow-hidden ${
                      isWinningCell
                        ? winnerInfo.winner === "X"
                          ? `border-cyan-400 bg-cyan-500/25 shadow-[0_0_30px_${theme.xGlow}] scale-[1.03] z-20`
                          : `border-pink-400 bg-pink-500/25 shadow-[0_0_30px_${theme.oGlow}] scale-[1.03] z-20`
                        : cellValue
                        ? "border-white/15 bg-white/[0.04] cursor-default"
                        : isCellDisabled
                        ? "border-white/10 bg-white/[0.02] cursor-not-allowed opacity-80"
                        : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.06] hover:scale-[1.02] cursor-pointer"
                    }`}
                  >
                    {/* Cyber Grid Corner Ticks */}
                    <span className="absolute top-1.5 left-1.5 text-[8px] font-mono text-white/20 select-none">
                      {["01", "02", "03", "04", "05", "06", "07", "08", "09"][idx]}
                    </span>
                    <span className="absolute bottom-1 right-1 text-[8px] font-mono text-white/10 select-none">
                      +
                    </span>

                    {/* Cell Content: X or O Mark */}
                    {cellValue === "X" && (
                      <div className="animate-in zoom-in-75 duration-200">
                        <svg
                          viewBox="0 0 100 100"
                          className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20"
                          style={{
                            filter: `drop-shadow(0 0 12px ${theme.xGlow})`,
                          }}
                        >
                          <defs>
                            <linearGradient id={`xGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor={theme.xColor} />
                              <stop offset="100%" stopColor="#FFFFFF" />
                            </linearGradient>
                          </defs>
                          <line
                            x1="22"
                            y1="22"
                            x2="78"
                            y2="78"
                            stroke={`url(#xGrad-${idx})`}
                            strokeWidth="12"
                            strokeLinecap="round"
                          />
                          <line
                            x1="78"
                            y1="22"
                            x2="22"
                            y2="78"
                            stroke={`url(#xGrad-${idx})`}
                            strokeWidth="12"
                            strokeLinecap="round"
                          />
                          {/* Center cyber diamond */}
                          <polygon
                            points="50,44 56,50 50,56 44,50"
                            fill="#FFFFFF"
                          />
                        </svg>
                      </div>
                    )}

                    {cellValue === "O" && (
                      <div className="animate-in zoom-in-75 duration-200">
                        <svg
                          viewBox="0 0 100 100"
                          className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20"
                          style={{
                            filter: `drop-shadow(0 0 12px ${theme.oGlow})`,
                          }}
                        >
                          <defs>
                            <linearGradient id={`oGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor={theme.oColor} />
                              <stop offset="100%" stopColor="#FFFFFF" />
                            </linearGradient>
                          </defs>
                          <circle
                            cx="50"
                            cy="50"
                            r="28"
                            fill="none"
                            stroke={`url(#oGrad-${idx})`}
                            strokeWidth="11"
                          />
                          {/* 4 Cyber Compass Nodes */}
                          <circle cx="50" cy="18" r="3" fill="#FFFFFF" />
                          <circle cx="50" cy="82" r="3" fill="#FFFFFF" />
                          <circle cx="18" cy="50" r="3" fill="#FFFFFF" />
                          <circle cx="82" cy="50" r="3" fill="#FFFFFF" />
                        </svg>
                      </div>
                    )}

                    {/* Holographic Ghost Mark on Hover */}
                    {isHovered && (
                      <div className="opacity-30 scale-90 transition-all pointer-events-none">
                        {turn === "X" ? (
                          <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-16 sm:h-16">
                            <line
                              x1="24"
                              y1="24"
                              x2="76"
                              y2="76"
                              stroke={theme.xColor}
                              strokeWidth="10"
                              strokeLinecap="round"
                            />
                            <line
                              x1="76"
                              y1="24"
                              x2="24"
                              y2="76"
                              stroke={theme.xColor}
                              strokeWidth="10"
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-16 sm:h-16">
                            <circle
                              cx="50"
                              cy="50"
                              r="26"
                              fill="none"
                              stroke={theme.oColor}
                              strokeWidth="10"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. Bottom Interactive Controls & Match Summary */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#D3FD50] hover:text-black border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
            >
              <FiRefreshCw className="text-sm" />
              <span>{winnerInfo ? "PLAY AGAIN" : "RESET ARENA"}</span>
            </button>

            <button
              onClick={resetAllStats}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <FiRotateCcw className="text-sm" />
              <span>CLEAR STATS</span>
            </button>
          </div>

          {/* Theme Switcher for Mobile */}
          <div className="flex sm:hidden items-center gap-2">
            <span className="text-[10px] font-mono text-white/50">THEME:</span>
            {Object.values(THEMES).map((thm) => (
              <button
                key={thm.id}
                onClick={() => setCurrentTheme(thm.id)}
                className={`w-6 h-6 rounded-full border ${
                  currentTheme === thm.id ? "border-white scale-110" : "border-transparent"
                }`}
                style={{
                  background: `linear-gradient(135deg, ${thm.dotX} 0%, ${thm.dotO} 100%)`,
                }}
              />
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest">
            <IoSparklesOutline className="text-[#D3FD50]" />
            <span>KINETIC PARTICLES // MINIMAX AI ENGINE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
