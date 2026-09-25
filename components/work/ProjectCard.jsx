"use client";

import React, { useRef, useEffect } from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

const ProjectCard = ({ project, index, onHover, onInView }) => {
  const cardRef = useRef(null);

  // IntersectionObserver to update active project when scrolled into main viewing zone
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onInView(project);
          }
        });
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: 0.15,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [project, onInView]);

  const isTall = project.shape === "pill";
  const displayIndex = (index + 1).toString().padStart(2, "0");

  return (
    <div
      ref={cardRef}
      id={`project-${project.id}`}
      onMouseEnter={() => onHover?.(project)}
      onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
      className="group flex flex-col gap-4 cursor-pointer select-none transition-all duration-300"
    >
      {/* 1. Visual Media Card */}
      <div
        className={`relative w-full overflow-hidden border border-white/15 bg-gradient-to-br ${project.bgColor} transition-all duration-500 group-hover:border-white/40 ${
          isTall
            ? "aspect-[4/5] rounded-[2.5rem] md:rounded-[3rem]"
            : "aspect-[16/11] md:aspect-[16/10] rounded-2xl md:rounded-3xl"
        }`}
      >
        {/* Background Image with Zoom on Hover */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-85 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 group-hover:from-black/70 transition-colors duration-500" />
        </div>

        {/* Top Floating Badge */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[11px] font-mono tracking-widest text-[#D3FD50] uppercase">
            {project.client}
          </span>
          <span className="w-8 h-8 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-[#D3FD50] group-hover:border-[#D3FD50] transition-colors">
            <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        {/* Signature K72 "( VIEW PROJECT )" Hover Pill in Center */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="px-7 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 rounded-full border-2 border-white bg-black/60 backdrop-blur-md shadow-2xl opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out">
            <span className="font-[font2] font-black text-base sm:text-xl md:text-2xl tracking-widest uppercase text-white whitespace-nowrap">
              VIEW PROJECT
            </span>
          </div>
        </div>
      </div>

      {/* 2. Project Details directly below the card */}
      <div className="px-2 pt-1 flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono text-white/40 tracking-wider">
              {displayIndex} /
            </span>
            <h3 className="font-[font2] font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white group-hover:text-[#D3FD50] transition-colors duration-200">
              {project.title}
            </h3>
          </div>
          <span className="text-xs font-mono text-white/50 tracking-wider">
            {project.year}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-white/70 text-xs sm:text-sm font-sans line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[10px] sm:text-xs font-mono tracking-wider text-white/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
