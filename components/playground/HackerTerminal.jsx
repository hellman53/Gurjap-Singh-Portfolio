"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { IoTerminalOutline } from "react-icons/io5";

const WELCOME_BANNER = [
  "   ____ _   _ ____      _   _    ____    ____ ___ _   _  ____ _   _ ",
  "  / ___| | | |  _ \\    | | / \\  |  _ \\  / ___|_ _| \\ | |/ ___| | | |",
  " | |  _| | | | |_) |   | |/ _ \\ | |_) | \\___ \\| ||  \\| | |  _| |_| |",
  " | |_| | |_| |  _ < _  | / ___ \\|  __/   ___) | || |\\  | |_| |  _  |",
  "  \\____|\\___/|_| \\_(_) |_/_/   \\_\\_|    |____/___|_| \\_|\\____|_| |_|",
  "",
  "SYSTEM ARCHITECTURE: NEXT.JS 16 // TURBOPACK // DOCKER // LINUX x86_64",
  "TYPE 'help' TO REVEAL COMMAND MATRIX. PRESS TAB FOR AUTOCOMPLETE.",
  "----------------------------------------------------------------------",
];

const HackerTerminal = () => {
  const [history, setHistory] = useState([
    { type: "banner", lines: WELCOME_BANNER },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);
  const matrixCanvasRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Play mechanical keyboard click sound
  const playKeySound = useCallback(() => {
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
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320 + Math.random() * 80, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // Audio not supported
    }
  }, []);

  // Auto scroll internal terminal log without moving the browser viewport/window
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  // Matrix Rain Canvas Animation
  useEffect(() => {
    if (!isMatrixActive) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const chars = "0123456789ABCDEF!@#$%^&*()_+~|}{[]:;?><";
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    let animId;
    const renderMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#D3FD50";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(renderMatrix);
    };

    animId = requestAnimationFrame(renderMatrix);

    return () => cancelAnimationFrame(animId);
  }, [isMatrixActive]);

  // Handle Command Execution
  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Append to command history for arrow-up retrieval
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newEntries = [{ type: "input", text: trimmed }];

    switch (cmd) {
      case "help":
        newEntries.push({
          type: "output",
          lines: [
            "AVAILABLE SYSTEM COMMANDS:",
            "  help            - Display this manual of commands",
            "  skills --bench  - Run live automated full-stack benchmarks",
            "  matrix          - Launch Matrix digital rain simulation",
            "  game            - Play the cyber security access bypass game",
            "  cat resume.txt  - View Gurjap Singh profile, stack & education",
            "  date            - Show system UTC clock timestamp",
            "  clear           - Flush terminal output buffer",
            "  sudo <cmd>      - Request root privileges",
            "  exit            - Close active fullscreen overlay",
          ],
        });
        break;

      case "skills":
      case "skills --bench":
        newEntries.push({
          type: "output",
          lines: [
            "[BENCHMARK] Executing multi-core competency evaluation...",
            "  ✦ Frontend & Next.js 16 [██████████████████░] 96% — React 19, Turbopack, Tailwind v4",
            "  ✦ Backend & APIs        [████████████████░░░] 91% — Node.js, Express, REST, MongoDB",
            "  ✦ AI Integration        [█████████████████░░] 94% — Google Gemini AI, AST, Prompting",
            "  ✦ Creative & Motion     [█████████████████░░] 93% — GSAP, WebGL, Canvas, Three.js",
            "  ✦ Cloud & Payments      [████████████████░░░] 89% — Stripe API, Clerk Auth, Docker",
            "[STATUS] All clusters operating at peak latency (Avg: 11ms).",
          ],
        });
        break;

      case "matrix":
        setIsMatrixActive(true);
        newEntries.push({
          type: "output",
          lines: ["INITIALIZING MATRIX NEURAL RAIN...", "Type 'exit' or click screen to return to CLI."],
        });
        break;

      case "exit":
        if (isMatrixActive) {
          setIsMatrixActive(false);
          newEntries.push({ type: "output", lines: ["Matrix simulation terminated."] });
        } else {
          newEntries.push({ type: "output", lines: ["Session is permanent. Use 'clear' to reset."] });
        }
        break;

      case "game":
        newEntries.push({
          type: "output",
          lines: [
            "[CYBER BYPASS MINI-GAME] Generating access code...",
            "Decrypt the 4-digit firewall token. Guess a number between 1000 and 9999.",
            "Hint: The firewall key is 2026 (The production year of this portfolio!).",
            "Type 'bypass 2026' to complete protocol breach.",
          ],
        });
        break;

      case "bypass":
        if (args[0] === "2026") {
          newEntries.push({
            type: "output",
            lines: [
              "ACCESS GRANTED! ✦ FIREWALL BREACHED",
              "You have unlocked root clearance to Gurjap Singh's digital portfolio.",
              "Reward: 100% Guaranteed response to collaboration inquiries.",
            ],
          });
        } else {
          newEntries.push({
            type: "output",
            lines: ["ACCESS DENIED: Invalid bypass code token. Try: bypass 2026"],
          });
        }
        break;

      case "cat":
        if (args[0] === "resume.txt" || args[0] === "resume") {
          newEntries.push({
            type: "output",
            lines: [
              "===================================================================",
              "GURJAP SINGH — FULL-STACK CREATIVE & AI SYSTEMS DEVELOPER",
              "===================================================================",
              "• Education: Bachelor of Technology in Computer Science & Engineering",
              "• GitHub: https://github.com/hellman53",
              "• LinkedIn: https://www.linkedin.com/in/gurjap-singh-8714a0301/",
              "• Core Focus: High-performance Next.js systems, Gemini AI applications,",
              "  and interactive creative web experiences with 60fps animations.",
              "• Featured Systems: BookMyDoctor, RefactorAI, TransitXpert, Memora.",
            ],
          });
        } else {
          newEntries.push({
            type: "output",
            lines: [`cat: ${args[0] || "file"}: No such file or directory. Try 'cat resume.txt'`],
          });
        }
        break;

      case "clear":
        setHistory([]);
        return;

      case "date":
        newEntries.push({
          type: "output",
          lines: [new Date().toUTCString()],
        });
        break;

      case "sudo":
        newEntries.push({
          type: "output",
          lines: [
            "gurjap is not in the sudoers file.",
            "This incident will be reported to the system administrator.",
          ],
        });
        break;

      default:
        newEntries.push({
          type: "output",
          lines: [`Command not found: '${cmd}'. Type 'help' to view available commands.`],
        });
        break;
    }

    setHistory((prev) => [...prev, ...newEntries]);
  };

  const handleKeyDown = (e) => {
    playKeySound();

    if (e.key === "Enter") {
      executeCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIdx);
      setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInputVal("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const available = ["help", "skills --bench", "matrix", "game", "cat resume.txt", "clear", "date", "exit"];
      const match = available.find((c) => c.startsWith(inputVal.trim()));
      if (match) setInputVal(match);
    }
  };

  return (
    <div id="hacker-terminal" className="w-full flex flex-col gap-6">
      {/* CRT Terminal Screen Frame (Fixed height, prevents outer expanding) */}
      <div
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className="relative rounded-3xl border border-white/20 bg-black/95 shadow-2xl p-6 md:p-8 font-mono overflow-hidden cursor-text h-[480px] sm:h-[520px] md:h-[560px] max-h-[560px] flex flex-col"
      >
        {/* Subtle Scanlines Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)",
            backgroundSize: "100% 4px",
          }}
        />

        {/* Matrix Rain Full Canvas Overlay (if active) */}
        {isMatrixActive && (
          <div
            onClick={() => setIsMatrixActive(false)}
            className="absolute inset-0 z-30 bg-black cursor-pointer"
          >
            <canvas ref={matrixCanvasRef} className="w-full h-full block" />
            <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 rounded border border-[#D3FD50] text-[#D3FD50] text-xs">
              CLICK ANYWHERE TO EXIT MATRIX
            </div>
          </div>
        )}

        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 shrink-0 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <IoTerminalOutline className="text-base text-[#D3FD50]" />
            <span className="text-[#D3FD50] font-bold">GURJAP_SHELL v2.4</span>
            <span className="hidden sm:inline text-white/30">— pts/0 (UTF-8)</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] tracking-widest text-white/40 uppercase">
            <span>TYPE &apos;HELP&apos; FOR COMMANDS</span>
          </div>
        </div>

        {/* Terminal Output Log Area (Scrollable internally with hidden scrollbar) */}
        <div
          ref={terminalBodyRef}
          className="flex-1 overflow-y-auto space-y-2 text-xs sm:text-sm leading-relaxed scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-1"
        >
          {history.map((entry, idx) => {
            if (entry.type === "banner") {
              return (
                <div key={idx} className="text-[#D3FD50] font-mono leading-tight whitespace-pre select-none text-[9px] sm:text-xs">
                  {entry.lines.join("\n")}
                </div>
              );
            }
            if (entry.type === "input") {
              return (
                <div key={idx} className="flex items-center gap-2 text-white">
                  <span className="text-[#D3FD50] font-bold">guest@gurjap:~$</span>
                  <span>{entry.text}</span>
                </div>
              );
            }
            if (entry.type === "output") {
              return (
                <div key={idx} className="text-white/80 whitespace-pre-wrap pl-4 border-l-2 border-white/15 my-1">
                  {entry.lines.join("\n")}
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Input Prompt */}
        <div className="flex items-center gap-2 pt-4 border-t border-white/10 shrink-0 text-xs sm:text-sm">
          <span className="text-[#D3FD50] font-bold shrink-0">guest@gurjap:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-[#D3FD50]"
            placeholder="Type 'help' or command..."
          />
        </div>
      </div>
    </div>
  );
};

export default HackerTerminal;
