"use client";

import React from "react";
import LiveClock from "@/components/common/LiveClock";
import { FaLinkedinIn, FaGithub, FaXTwitter } from "react-icons/fa6";
import { SiHashnode } from "react-icons/si";
import { FiArrowUpRight, FiMail } from "react-icons/fi";

const WorkFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/hellman53",
      icon: <FaGithub />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/gurjap-singh-8714a0301/",
      icon: <FaLinkedinIn />,
    },
    {
      name: "Twitter",
      href: "https://x.com/Gurjap_Singh_53",
      icon: <FaXTwitter />,
    },
    {
      name: "Hashnode",
      href: "https://hashnode.com/@gurjapsingh",
      icon: <SiHashnode />,
    },
  ];

  return (
    <footer className="w-full bg-[#0a0a0a] text-white pt-20 md:pt-28 pb-10 md:pb-14 px-6 md:px-14 border-t border-white/15">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Block */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 pb-16 md:pb-24 border-b border-white/15">
          {/* Left Column: Bold Headline & Status */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#D3FD50]/30 bg-[#D3FD50]/10 text-xs font-mono uppercase tracking-widest text-[#D3FD50] mb-6 select-none">
              <span className="w-2 h-2 rounded-full bg-[#D3FD50] animate-pulse" />
              <span>Available for Roles & Freelance</span>
            </div>

            <h2 className="font-[font2] font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase text-white leading-none">
              LET'S BUILD <br />
              <span className="text-[#D3FD50]">SOMETHING GREAT.</span>
            </h2>
          </div>

          {/* Right Column: Contact Action & Direct Links */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4 w-full lg:w-auto">
            <a
              href="https://www.linkedin.com/in/gurjap-singh-8714a0301/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#D3FD50] hover:bg-white text-black font-[font2] font-black text-base sm:text-lg tracking-wider uppercase shadow-xl shadow-[#D3FD50]/10 hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto group"
            >
              <span>GET IN TOUCH</span>
              <FiArrowUpRight className="text-xl transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="mailto:contact@gurjapsingh.dev"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full border border-white/20 bg-white/5 hover:border-white text-white/90 hover:text-white font-mono text-xs sm:text-sm tracking-wider uppercase transition-colors duration-200 w-full sm:w-auto"
            >
              <FiMail className="text-base text-[#D3FD50]" />
              <span>SAY HELLO DIRECTLY</span>
            </a>
          </div>
        </div>

        {/* Mid Row: Social Media Brand Icons */}
        <div className="py-10 md:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-white/10">
          <span className="font-mono text-xs uppercase tracking-widest text-white/50">
            CONNECT & FOLLOW
          </span>

          <div className="flex items-center gap-3 sm:gap-4 select-none">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-xl sm:text-2xl text-white hover:bg-[#D3FD50] hover:text-black hover:border-[#D3FD50] hover:scale-110 active:scale-95 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Live Clock + Credits + Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono uppercase tracking-widest text-white/50">
          {/* Left: New Delhi Live Clock */}
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <LiveClock city="NEW DELHI" />
          </div>

          {/* Center: Credits */}
          <div className="text-center">
            <span>GURJAP SINGH © 2026</span>
            <span className="mx-2 text-[#D3FD50]">✦</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          {/* Right: Smooth Back to Top */}
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <button
              onClick={scrollToTop}
              className="text-white/80 hover:text-[#D3FD50] border-b border-transparent hover:border-[#D3FD50] transition-all duration-200 cursor-pointer"
            >
              BACK TO TOP ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WorkFooter;
