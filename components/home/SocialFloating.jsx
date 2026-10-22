import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiHashnode } from "react-icons/si";

export const SocialLinksList = ({ iconSize = "text-lg", gap = "gap-4" }) => (
  <div className={`flex items-center ${gap}`}>
    <a
      href="https://www.linkedin.com/in/gurjap-singh-8714a0301/"
      target="_blank"
      rel="noreferrer"
      aria-label="LinkedIn Profile"
      className={`text-white/80 hover:text-[#D3FD50] ${iconSize} transition-all duration-300 hover:scale-110 active:scale-95 p-1`}
    >
      <FaLinkedin />
    </a>

    <a
      href="https://x.com/Gurjap_Singh_53"
      target="_blank"
      rel="noreferrer"
      aria-label="X Profile"
      className={`text-white/80 hover:text-[#D3FD50] ${iconSize} transition-all duration-300 hover:scale-110 active:scale-95 p-1`}
    >
      <FaXTwitter />
    </a>

    <a
      href="https://github.com/hellman53"
      target="_blank"
      rel="noreferrer"
      aria-label="GitHub Profile"
      className={`text-white/80 hover:text-[#D3FD50] ${iconSize} transition-all duration-300 hover:scale-110 active:scale-95 p-1`}
    >
      <FaGithub />
    </a>

    <a
      href="https://hashnode.com/@gurjapsingh"
      target="_blank"
      rel="noreferrer"
      aria-label="Hashnode Blog"
      className={`text-white/80 hover:text-[#D3FD50] ${iconSize} transition-all duration-300 hover:scale-110 active:scale-95 p-1`}
    >
      <SiHashnode />
    </a>
  </div>
);

const SocialFloating = () => {
  return (
    <aside
      aria-label="Social links"
      className="hidden md:flex fixed bottom-8 right-8 z-40 flex-col gap-4 bg-black/60 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/20"
    >
      <SocialLinksList iconSize="text-2xl" gap="flex-col gap-4" />
    </aside>
  );
};

export default SocialFloating;
