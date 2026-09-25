"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiCheck, FiX, FiRefreshCw, FiZap, FiAward } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";

const CHALLENGES = [
  {
    id: 1,
    title: "React Memory Leak & Infinite Loop",
    snippet: [
      { line: 1, code: "useEffect(() => {" },
      { line: 2, code: "  const interval = setInterval(() => {" },
      { line: 3, code: "    fetchData(userId);" },
      { line: 4, code: "  }, 1000);" },
      { line: 5, code: "  // BUG: Missing interval cleanup on component unmount" },
      { line: 6, code: "}, [userId]);" },
    ],
    bugLine: 5,
    bugExplanation: "Missing return () => clearInterval(interval) cleanup function causes severe memory leaks.",
    refactorFix: "return () => clearInterval(interval);",
  },
  {
    id: 2,
    title: "Direct React State Mutation",
    snippet: [
      { line: 1, code: "const handleAddTodo = (newTodo) => {" },
      { line: 2, code: "  const list = todos;" },
      { line: 3, code: "  list.push(newTodo); // BUG: Mutating state directly!" },
      { line: 4, code: "  setTodos(list);" },
      { line: 5, code: "};" },
    ],
    bugLine: 3,
    bugExplanation: "Array.prototype.push mutates the original reference, causing React to miss re-renders.",
    refactorFix: "setTodos(prev => [...prev, newTodo]);",
  },
  {
    id: 3,
    title: "Security: Raw SQL Injection Risk",
    snippet: [
      { line: 1, code: "app.get('/user', async (req, res) => {" },
      { line: 2, code: "  const { id } = req.query;" },
      { line: 3, code: "  const query = `SELECT * FROM users WHERE id = '${id}'`;" },
      { line: 4, code: "  const user = await db.raw(query);" },
      { line: 5, code: "  return res.json(user);" },
      { line: 6, code: "});" },
    ],
    bugLine: 3,
    bugExplanation: "Unsanitized string interpolation directly exposes database to SQL Injection attacks.",
    refactorFix: "db.query('SELECT * FROM users WHERE id = $1', [id]);",
  },
  {
    id: 4,
    title: "Async Floating Promise Exception",
    snippet: [
      { line: 1, code: "export async function syncHealthRecord(patientId) {" },
      { line: 2, code: "  validatePatient(patientId);" },
      { line: 3, code: "  apiClient.post('/sync', { patientId }); // BUG: Missing await" },
      { line: 4, code: "  return { status: 'synchronized' };" },
      { line: 5, code: "}" },
    ],
    bugLine: 3,
    bugExplanation: "Calling async apiClient.post without await allows failures to slip by uncaught.",
    refactorFix: "await apiClient.post('/sync', { patientId });",
  },
];

const BeatTheAiGame = () => {
  const [gameState, setGameState] = useState("ready"); // 'ready', 'playing', 'round-result', 'game-over'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedLine, setSelectedLine] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const timerRef = useRef(null);
  const currentChallenge = CHALLENGES[currentIndex];

  const handleTimeOut = useCallback(() => {
    clearInterval(timerRef.current);
    setSelectedLine(null);
    setIsCorrect(false);
    setStreak(0);
    setGameState("round-result");
  }, []);

  // 10s Countdown Timer per question
  useEffect(() => {
    if (gameState === "playing") {
      setTimeLeft(10);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, currentIndex, handleTimeOut]);

  const startGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedLine(null);
    setIsCorrect(null);
    setGameState("playing");
  };

  const handleLineClick = (lineNum) => {
    if (gameState !== "playing") return;
    clearInterval(timerRef.current);
    setSelectedLine(lineNum);

    const correct = lineNum === currentChallenge.bugLine;
    setIsCorrect(correct);

    if (correct) {
      const speedBonus = timeLeft * 10;
      const points = 100 + speedBonus + streak * 25;
      setScore((s) => s + points);
      setStreak((st) => st + 1);
    } else {
      setStreak(0);
    }

    setGameState("round-result");
  };

  const handleNext = () => {
    if (currentIndex + 1 < CHALLENGES.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedLine(null);
      setIsCorrect(null);
      setGameState("playing");
    } else {
      setGameState("game-over");
    }
  };

  const getRank = () => {
    if (score >= 600) return { title: "PRINCIPAL AI ARCHITECT", badge: "✦ MASTER OF AST" };
    if (score >= 400) return { title: "SENIOR CLEAN-CODE ENGINEER", badge: "✦ SPEED REFACTORER" };
    if (score >= 200) return { title: "FULL-STACK CODE REVIEWER", badge: "✦ BUG HUNTER" };
    return { title: "JUNIOR DEBUGGER", badge: "✦ APPRENTICE" };
  };

  return (
    <div id="beat-the-ai" className="w-full flex flex-col gap-6">
      {/* Game Window Container */}
      <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-[#0d0d0d] shadow-2xl p-6 md:p-8">
        {/* Top Window Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="font-mono text-xs text-white/50 tracking-wider uppercase ml-2">
              REFACTOR_ARENA.TSX — GEMINI AI SPEED ENGINE
            </span>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-4 font-mono text-xs tracking-wider uppercase">
            <div className="flex items-center gap-1.5 text-white/70">
              <span>SCORE:</span>
              <strong className="text-[#D3FD50] font-bold text-sm">{score}</strong>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1.5 text-white/70">
              <FiZap className="text-[#D3FD50]" />
              <span>STREAK:</span>
              <strong className="text-[#D3FD50] font-bold text-sm">x{streak}</strong>
            </div>
          </div>
        </div>

        {/* State 1: Start Screen */}
        {gameState === "ready" && (
          <div className="py-12 md:py-16 flex flex-col items-center text-center gap-6 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#D3FD50]/10 border border-[#D3FD50]/40 flex items-center justify-center text-[#D3FD50] text-3xl">
              <IoSparklesOutline className="animate-spin" style={{ animationDuration: "8s" }} />
            </div>
            <div>
              <h3 className="font-[font2] font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
                BEAT THE AI REFACTOR
              </h3>
              <p className="font-mono text-xs sm:text-sm text-white/60 uppercase tracking-widest mt-2 leading-relaxed">
                You have 10 seconds per round. Spot the anti-pattern or bug line before the Gemini AI Refactoring Engine catches it!
              </p>
            </div>
            <button
              onClick={startGame}
              className="px-8 py-3.5 rounded-full bg-[#D3FD50] text-black font-[font2] font-black text-base uppercase tracking-wider transition-all hover:scale-105 hover:bg-white active:scale-95 cursor-pointer shadow-[0_0_25px_rgba(211,253,80,0.3)]"
            >
              START SPEED CHALLENGE
            </button>
          </div>
        )}

        {/* State 2 & 3: Playing & Round Result */}
        {(gameState === "playing" || gameState === "round-result") && (
          <div className="flex flex-col gap-6">
            {/* Round & Countdown Header */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#D3FD50] block">
                  CHALLENGE {currentIndex + 1} OF {CHALLENGES.length}
                </span>
                <h4 className="font-[font2] font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                  {currentChallenge.title}
                </h4>
              </div>

              {/* Timer Bar */}
              <div className="flex flex-col items-end gap-1">
                <span className="font-mono text-xs font-bold text-white tracking-widest">
                  ⏱ 00:{timeLeft.toString().padStart(2, "0")}
                </span>
                <div className="w-28 sm:w-36 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ease-linear ${
                      timeLeft > 5 ? "bg-[#D3FD50]" : timeLeft > 2 ? "bg-amber-400" : "bg-rose-500 animate-pulse"
                    }`}
                    style={{ width: `${(timeLeft / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Code Snippet Editor Box */}
            <div className="relative rounded-2xl border border-white/10 bg-black/60 p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto select-none">
              {currentChallenge.snippet.map((item) => {
                const isSelected = selectedLine === item.line;
                const isTargetBug = item.line === currentChallenge.bugLine;
                const showBugHighlight = gameState === "round-result" && isTargetBug;

                let rowBg = "hover:bg-white/5 cursor-pointer";
                if (showBugHighlight) {
                  rowBg = "bg-rose-950/60 border-l-4 border-rose-500 text-rose-200";
                } else if (isSelected && !isTargetBug) {
                  rowBg = "bg-amber-950/40 border-l-4 border-amber-500 text-amber-200";
                }

                return (
                  <div
                    key={item.line}
                    onClick={() => handleLineClick(item.line)}
                    className={`flex items-center gap-4 px-3 py-1.5 rounded transition-colors duration-150 ${rowBg}`}
                  >
                    <span className="text-white/30 text-xs w-6 text-right select-none">
                      {item.line}
                    </span>
                    <span className="font-mono whitespace-pre flex-1 text-white/90">
                      {item.code}
                    </span>
                    {showBugHighlight && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 uppercase tracking-widest shrink-0">
                        BUG DETECTED
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Round Feedback Popover */}
            {gameState === "round-result" && (
              <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadein ${
                isCorrect ? "bg-emerald-950/40 border-emerald-500/40" : "bg-neutral-900 border-white/20"
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    isCorrect ? "bg-emerald-500 text-black" : "bg-amber-500 text-black"
                  }`}>
                    {isCorrect ? <FiCheck className="text-lg font-black" /> : <FiX className="text-lg font-black" />}
                  </div>
                  <div>
                    <h5 className="font-[font2] font-black text-lg uppercase tracking-wider text-white">
                      {isCorrect ? "SPOT ON! YOU BEAT THE AI" : "AI REFACTOR ENGINE TRIGGERED"}
                    </h5>
                    <p className="font-mono text-xs text-white/70 mt-1">
                      {currentChallenge.bugExplanation}
                    </p>
                    <div className="mt-2 text-xs font-mono text-[#D3FD50] bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 inline-block">
                      ✦ CLEAN FIX: <code className="text-white">{currentChallenge.refactorFix}</code>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-full bg-[#D3FD50] text-black font-[font2] font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 self-end sm:self-center"
                >
                  {currentIndex + 1 < CHALLENGES.length ? "NEXT ROUND ➔" : "VIEW FINAL RANK ➔"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* State 4: Game Over Summary */}
        {gameState === "game-over" && (
          <div className="py-10 flex flex-col items-center text-center gap-6 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#D3FD50]/10 border border-[#D3FD50] flex items-center justify-center text-[#D3FD50] text-3xl">
              <FiAward />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D3FD50]">
                {getRank().badge}
              </span>
              <h3 className="font-[font2] font-black text-3xl sm:text-4xl uppercase text-white mt-1">
                {getRank().title}
              </h3>
              <p className="font-mono text-sm text-white/70 uppercase tracking-widest mt-2">
                FINAL SCORE: <strong className="text-[#D3FD50] text-xl font-bold">{score} PTS</strong>
              </p>
            </div>

            <button
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#D3FD50] text-black font-[font2] font-black text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <FiRefreshCw />
              <span>PLAY AGAIN</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeatTheAiGame;
