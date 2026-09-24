"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TransitionLink from "./TransitionLink";

const MenuRow = ({
  title,
  marqueeText = "SEE EVERYTHING",
  images = ["/logo1.webp", "/logo2.webp"],
  href = "/",
  symbol = "✦",
  onNavigate,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  // Dynamically calculate duration based on pixel width to maintain identical, calm velocity across all rows
  useGSAP(() => {
    if (!trackRef.current) return;

    tweenRef.current?.kill();

    // Measure the exact half-track distance (50% travel distance)
    const travelDistance = trackRef.current.scrollWidth / 2 || 2500;
    // Calm, readable velocity (pixels per second)
    const pixelsPerSecond = 140;
    const calculatedDuration = travelDistance / pixelsPerSecond;

    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: calculatedDuration,
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [marqueeText]);

  // Single block containing repeating phrases with sticker capsules
  const renderMarqueeBlock = (keyPrefix) => (
    <div key={keyPrefix} className="flex items-center shrink-0">
      {[...Array(5)].map((_, i) => (
        <span key={`${keyPrefix}-${i}`} className="inline-flex items-center">
          <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-black font-[font2] whitespace-nowrap leading-none select-none">
            {marqueeText}
          </span>
          <span className="mx-4 sm:mx-6 md:mx-8 inline-block overflow-hidden rounded-full w-12 h-7 sm:w-16 sm:h-9 md:w-20 md:h-11 lg:w-24 lg:h-12 border-2 border-black/70 shadow-sm bg-black/10 shrink-0">
            <img
              src={images[i % images.length]}
              alt="sticker capsule"
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </span>
          {symbol && (
            <span className="text-black/80 text-xl sm:text-3xl md:text-4xl font-black mr-4 sm:mr-6 md:mr-8 select-none">
              {symbol}
            </span>
          )}
        </span>
      ))}
    </div>
  );

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-1 w-full relative border-t border-white/15 overflow-hidden transition-colors duration-150 cursor-pointer select-none group"
      style={{
        backgroundColor: isHovered ? "#D3FD50" : "transparent",
      }}
    >
      <TransitionLink
        href={href}
        onClick={() => onNavigate?.()}
        className="w-full h-full flex items-center justify-center focus:outline-none relative"
      >
        {/* State 1: Default Static Title (Clean centered typography, hidden on hover) */}
        <div
          className={`flex items-center justify-center w-full px-4 transition-opacity duration-150 ${
            isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white uppercase font-[font2] text-center leading-none">
            {title}
          </h2>
        </div>

        {/* State 2: Hover Marquee Ribbon (Solid green bar with GSAP-driven infinite scrolling ticker) */}
        <div
          className={`absolute inset-0 flex items-center overflow-hidden bg-[#D3FD50] transition-opacity duration-150 ${
            isHovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            ref={trackRef}
            className="flex items-center shrink-0 will-change-transform"
          >
            {renderMarqueeBlock("track-1")}
            {renderMarqueeBlock("track-2")}
          </div>
        </div>
      </TransitionLink>
    </div>
  );
};

export default MenuRow;
