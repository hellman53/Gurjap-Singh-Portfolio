"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AboutParallaxTicker = () => {
  const tickerRef1 = useRef(null);
  const tickerRef2 = useRef(null);
  const tween1 = useRef(null);
  const tween2 = useRef(null);

  useGSAP(() => {
    tween1.current?.kill();
    tween2.current?.kill();

    if (tickerRef1.current) {
      tween1.current = gsap.to(tickerRef1.current, {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
      });
    }

    if (tickerRef2.current) {
      tween2.current = gsap.fromTo(
        tickerRef2.current,
        { xPercent: -50 },
        {
          xPercent: 0,
          ease: "none",
          duration: 45,
          repeat: -1,
        }
      );
    }

    return () => {
      tween1.current?.kill();
      tween2.current?.kill();
    };
  }, []);

  const renderLine1Block = (keyPrefix) => (
    <div key={keyPrefix} className="flex items-center shrink-0">
      {[...Array(4)].map((_, i) => (
        <span key={`${keyPrefix}-${i}`} className="inline-flex items-center shrink-0">
          <span className="font-[font2] font-black text-6xl sm:text-8xl md:text-9xl uppercase tracking-tighter text-[#D3FD50] mr-6 md:mr-10">
            GURJAP SINGH
          </span>
          <span className="font-[font2] font-black text-6xl sm:text-8xl md:text-9xl uppercase tracking-tighter text-white mr-6 md:mr-10">
            FULL-STACK DEVELOPER
          </span>
          <span className="text-[#D3FD50] text-4xl sm:text-6xl md:text-7xl mr-6 md:mr-10">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  const renderLine2Block = (keyPrefix) => (
    <div key={keyPrefix} className="flex items-center shrink-0">
      {[...Array(4)].map((_, i) => (
        <span key={`${keyPrefix}-${i}`} className="inline-flex items-center shrink-0">
          <span className="font-[font2] font-black text-6xl sm:text-8xl md:text-9xl uppercase tracking-tighter text-white mr-6 md:mr-10">
            AI RESEARCHER
          </span>
          <span className="font-[font2] font-black text-6xl sm:text-8xl md:text-9xl uppercase tracking-tighter text-[#D3FD50] mr-6 md:mr-10">
            CODEVITA #123
          </span>
          <span className="text-white text-4xl sm:text-6xl md:text-7xl mr-6 md:mr-10">
            ✦
          </span>
          <span className="font-[font2] font-black text-6xl sm:text-8xl md:text-9xl uppercase tracking-tighter text-white mr-6 md:mr-10">
            CREATIVE ARCHITECT
          </span>
          <span className="text-[#D3FD50] text-4xl sm:text-6xl md:text-7xl mr-6 md:mr-10">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="relative w-full bg-black py-28 md:py-40 overflow-hidden select-none border-t border-white/15">
      {/* Horizontal Giant Ticker 1 (Moving Left, Continuous Loop) */}
      <div className="w-full overflow-hidden flex whitespace-nowrap mb-6 md:mb-10">
        <div ref={tickerRef1} className="flex items-center shrink-0 will-change-transform">
          {renderLine1Block("line1-a")}
          {renderLine1Block("line1-b")}
        </div>
      </div>

      {/* Horizontal Giant Ticker 2 (Moving Left, Continuous Loop - Exactly like Line 1) */}
      <div className="w-full overflow-hidden flex whitespace-nowrap">
        <div ref={tickerRef2} className="flex items-center shrink-0 will-change-transform">
          {renderLine2Block("line2-a")}
          {renderLine2Block("line2-b")}
        </div>
      </div>

      {/* Center Floating Portrait Card (Matches K72 Pinned Card in Video 00:05) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-[50vw] sm:w-[35vw] md:w-[22vw] aspect-[4/5] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-2 border-white/20 shadow-2xl bg-neutral-900/90 backdrop-blur-md transform hover:scale-105 transition-transform duration-500">
          <img
            src="/profile.jpg"
            alt="Gurjap Singh"
            className="w-full h-full object-cover filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-center">
            <span className="font-[font2] font-black text-sm md:text-base text-white tracking-widest uppercase block">
              GURJAP SINGH
            </span>
            <span className="font-mono text-[10px] md:text-xs text-[#D3FD50] tracking-widest uppercase">
              NEW DELHI, INDIA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutParallaxTicker;
