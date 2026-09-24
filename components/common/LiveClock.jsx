"use client";

import React, { useState, useEffect } from "react";
import { FiGlobe } from "react-icons/fi";

const LiveClock = ({ city = "NEW DELHI" }) => {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      // Time formatted specifically for Asia/Kolkata (New Delhi)
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTimeStr(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs md:text-sm font-mono tracking-wider text-white/90 uppercase select-none">
      <FiGlobe className="text-base text-[#D3FD50] animate-spin" style={{ animationDuration: "12s" }} />
      <span>
        {city}_{timeStr || "--:--:--"}
      </span>
    </div>
  );
};

export default LiveClock;
