"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/projectsData";
import StickyProjectBar from "@/components/work/StickyProjectBar";
import ProjectCard from "@/components/work/ProjectCard";
import PlaygroundCallout from "@/components/work/PlaygroundCallout";
import WorkFooter from "@/components/work/WorkFooter";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(projectsData[0]);

  // Split into left and right columns for staggered asymmetrical scroll flow
  const leftCol = projectsData.filter((_, i) => i % 2 === 0);
  const rightCol = projectsData.filter((_, i) => i % 2 !== 0);

  return (
    <div className="w-full min-h-screen bg-[#111] text-white">
      {/* 1. Page Hero Section */}
      <section className="pt-28 md:pt-36 pb-6 px-6 md:px-14">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15 pb-8 md:pb-12">
          <div>
            <h1 className="font-[font2] font-black text-[16vw] md:text-[12vw] uppercase leading-none tracking-tighter text-white flex items-start select-none">
              WORK
              <sup className="text-[5vw] md:text-[4vw] font-bold text-[#D3FD50] ml-2 mt-2">
                {projectsData.length}
              </sup>
            </h1>
          </div>
          <div className="max-w-md font-mono text-xs md:text-sm text-white/60 uppercase tracking-widest leading-relaxed">
            <p>
              Selected digital creations, production full-stack systems, and AI developer tooling engineered by Gurjap Singh.
            </p>
          </div>
        </div>
      </section>

      {/* 2. K72-Style Sticky Dynamic Project Bar (Updates on hover and scroll, translucent frosted glass) */}
      <StickyProjectBar activeProject={activeProject} />

      {/* 3. Staggered Asymmetrical 2-Column Scroll Flow */}
      <main className="max-w-7xl mx-auto px-6 md:px-14 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-14 md:gap-24">
            {leftCol.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index * 2}
                onHover={setActiveProject}
                onInView={setActiveProject}
              />
            ))}
          </div>

          {/* Right Column (Staggered offset) */}
          <div className="flex flex-col gap-14 md:gap-24 mt-0 md:mt-24 lg:mt-32">
            {rightCol.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index * 2 + 1}
                onHover={setActiveProject}
                onInView={setActiveProject}
              />
            ))}
          </div>
        </div>
      </main>

      {/* 4. Dedicated Playground Transition Callout */}
      <PlaygroundCallout />

      {/* 5. K72 Editorial Work Footer */}
      <WorkFooter />
    </div>
  );
};

export default Projects;