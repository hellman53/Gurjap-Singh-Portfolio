"use client";

import React, { useEffect, useState } from "react";
import MenuRow from "./MenuRow";
import LiveClock from "./LiveClock";
import { FaLinkedinIn, FaGithub, FaXTwitter } from "react-icons/fa6";
import { SiHashnode } from "react-icons/si";
import { IoClose } from "react-icons/io5";

const MenuOverlay = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setAnimateIn(true), 20);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      document.body.style.overflow = "";
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  const menuItems = [
    {
      title: "WORK",
      marqueeText: "SEE EVERYTHING",
      href: "/projects",
      images: [
        "/projects/book-my-doctor.jpg",
        "/projects/refactor-ai.jpg",
        "/projects/transit-xpert.jpg",
        "/projects/memora.jpg",
      ],
    },
    {
      title: "ABOUT",
      marqueeText: "KNOW ME",
      href: "/about-me",
      images: [
        "/projects/creative_code.jpg",
        "/projects/cpu_gold.jpg",
        "/projects/crypto_cube.jpg",
        "/projects/devtools-suite.jpg",
      ],
    },
    {
      title: "PLAYGROUND",
      marqueeText: "EXPERIMENTS & LAB",
      href: "/playground",
      images: [
        "/projects/quantum_sphere.jpg",
        "/projects/react_3d.jpg",
        "/projects/cyber_wire.jpg",
        "/projects/ai_neural.jpg",
      ],
    },
    {
      title: "CONTACT",
      marqueeText: "SEND A MESSAGE",
      href: "https://www.linkedin.com/in/gurjap-singh-8714a0301/",
      images: [
        "/projects/cyber_server.jpg",
        "/projects/linkbox.jpg",
        "/projects/neon_tunnel.jpg",
        "/projects/crypto_cube.jpg",
      ],
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-[90] bg-[#0a0a0a] text-white h-screen max-h-screen overflow-hidden flex flex-col justify-between transition-all duration-300 ease-out select-none ${
        animateIn
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      {/* 1. Top Header Bar (Fixed Height) */}
      <header className="w-full px-6 py-4 md:px-12 md:py-6 flex items-center justify-between z-10 border-b border-white/15 shrink-0 bg-[#0a0a0a]">
        <div className="flex items-center gap-4 md:gap-6">
          <span className="font-[font2] font-black text-xl md:text-2xl tracking-tight uppercase text-white">
            GURJAP SINGH
          </span>
          <span className="hidden sm:inline-block text-xs font-mono tracking-widest text-white/50 uppercase border-l border-white/20 pl-4 md:pl-6">
            PORTFOLIO / CREATIVE DEV
          </span>
        </div>

        {/* Big Neon Close Button */}
        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          className="group flex items-center justify-center p-1.5 rounded-full cursor-pointer transition-transform duration-300 hover:rotate-90 active:scale-90 focus:outline-none"
        >
          <IoClose className="text-3xl md:text-4xl text-[#D3FD50] transition-transform duration-200 group-hover:scale-110" />
        </button>
      </header>

      {/* 2. Middle Navigation Rows (Evenly Fills Available Height, No Overflow) */}
      <nav className="w-full flex-1 flex flex-col justify-stretch overflow-hidden">
        {menuItems.map((item) => (
          <MenuRow
            key={item.title}
            title={item.title}
            marqueeText={item.marqueeText}
            href={item.href}
            images={item.images}
            onNavigate={onClose}
          />
        ))}
        {/* Enclosing divider under the last row */}
        <div className="border-b border-white/15 w-full shrink-0" />
      </nav>

      {/* 3. Bottom Footer Bar (Always Visible, Pinned to Viewport Bottom) */}
      <footer className="w-full px-6 py-4 md:px-12 md:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/15 z-10 shrink-0 bg-[#0a0a0a]">
        {/* Left: Real-time Live Clock */}
        <div className="flex items-center">
          <LiveClock city="NEW DELHI" />
        </div>

        {/* Center: Branding & Status */}
        <div className="text-center font-mono text-xs text-white/50 uppercase tracking-widest">
          <span>GURJAP SINGH © 2026</span>
          <span className="hidden md:inline mx-3 text-[#D3FD50]">✦</span>
          <span className="hidden md:inline">AVAILABLE FOR WORK</span>
        </div>

        {/* Right: Circular Social Badges */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/hellman53"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-sm text-white hover:bg-[#D3FD50] hover:text-black hover:border-[#D3FD50] transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/gurjap-singh-8714a0301/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-sm text-white hover:bg-[#D3FD50] hover:text-black hover:border-[#D3FD50] transition-colors"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://x.com/Gurjap_Singh_53"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter/X"
            className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-sm text-white hover:bg-[#D3FD50] hover:text-black hover:border-[#D3FD50] transition-colors"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://hashnode.com/@gurjapsingh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hashnode"
            className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-sm text-white hover:bg-[#D3FD50] hover:text-black hover:border-[#D3FD50] transition-colors"
          >
            <SiHashnode />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default MenuOverlay;
