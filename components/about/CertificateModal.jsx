"use client";

import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";

const CertificateModal = ({ certificate, onClose }) => {
  useEffect(() => {
    if (!certificate) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10 select-none animate-fadein"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#111] border border-white/20 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/15 bg-black/60">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#D3FD50]">
              {certificate.category}
            </span>
            <h3 className="font-[font2] font-black text-lg md:text-2xl text-white uppercase tracking-tight">
              {certificate.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full text-white/80 hover:text-black hover:bg-[#D3FD50] transition-colors duration-200"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Certificate Image View */}
        <div className="p-4 sm:p-6 flex-1 overflow-auto flex items-center justify-center bg-black/40">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="max-h-[60vh] w-auto object-contain rounded-lg border border-white/10 shadow-lg"
          />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/15 bg-black/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-white/70">
          <div>
            <span className="text-white font-semibold">{certificate.organization}</span>
            <span className="mx-2 text-[#D3FD50]">✦</span>
            <span>{certificate.year}</span>
          </div>

          <a
            href={`https://github.com/hellman53/Achievements/blob/main/${certificate.image.replace("/achievements/", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#D3FD50] hover:text-white transition-colors"
          >
            <span>View on GitHub Repository</span>
            <FiExternalLink />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
