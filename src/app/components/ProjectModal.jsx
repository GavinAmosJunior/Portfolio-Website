// /src/app/components/ProjectModal.jsx
"use client";
import React, { useState, useEffect } from "react";

export default function ProjectModal({ project, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [imageFading, setImageFading] = useState(false);

  const images =
    Array.isArray(project?.imageUrls) && project.imageUrls.length > 0
      ? project.imageUrls
      : project?.imageUrl
      ? [project.imageUrl]
      : [];

  // ⚙️ Modal open/close transitions (Logic remains the same)
  useEffect(() => {
    if (isOpen) {
      setActive(true);
      document.body.style.overflow = "hidden";
      setTimeout(() => setTransitioning(true), 10);
    } else if (active) {
      setTransitioning(false);
      setTimeout(() => setActive(false), 300);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, active]);

  if (!active && !isOpen) return null;
  if (!project) return null;

  // 🔄 Image Navigation (Logic remains the same)
  const goToNext = () => {
    setImageFading(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setImageFading(false);
    }, 250);
  };

  const goToPrev = () => {
    setImageFading(true);
    setTimeout(() => {
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
      setImageFading(false);
    }, 250);
  };

  const handlePdfDownload = () => {
    if (project.pdfUrl) {
      const link = document.createElement("a");
      link.href = project.pdfUrl;
      link.download = `${project.title}-Documentation.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // 🍎 FINAL FIX: RENDER LINK BUTTON (Refined Typography)
  const renderLinkButton = (url, isPrimary, keyType) => {
    if (!url) return null;

    let text = "View Project";
    if (url.includes("github")) {
      text = "View on GitHub";
    } else if (
      url.includes("youtube") ||
      url.includes("vimeo") ||
      url.includes("demo")
    ) {
      text = "Watch Demonstration";
    } else if (isPrimary) {
      text = "Visit Live Demo";
    }

    // NEW TYPOGRAPHY: font-medium, text-base, tracking-tight
    const buttonTextClasses = "font-medium text-base tracking-tight";

    const baseClass = `w-full flex items-center justify-center py-3 rounded-2xl ${buttonTextClasses} transition-all duration-200 active:scale-[0.99] shadow-[0_4px_16px_rgba(0,0,0,0.05)]`;

    const colorClass = isPrimary
      ? "bg-black text-white/90 hover:bg-neutral-800 hover:text-white"
      : "bg-white/70 border border-gray-200 text-gray-800 hover:bg-white";

    return (
      <a
        key={`${url}-${keyType}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full"
      >
        <button className={`${baseClass} ${colorClass}`}>{text}</button>
      </a>
    );
  };

  // --- COMPONENT ---
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 overflow-hidden ${
        transitioning
          ? "opacity-100 bg-gray-900/70 backdrop-blur-md"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* MODAL CONTAINER */}
      <div
        className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl md:max-w-4xl transform transition-all duration-300 ${
          transitioning ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => {
            setTransitioning(false);
            setTimeout(() => onClose(), 300);
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition z-50 text-2xl font-light"
          aria-label="Close"
        >
          &times;
        </button>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="overflow-y-auto max-h-[90vh] modal-scroll">
          {/* IMAGE AREA */}
          <div className="w-full bg-neutral-100 relative overflow-hidden flex items-center justify-center p-4 md:p-6 rounded-t-3xl transition-colors">
            {/* Image logic remains the same */}
            {images.length > 0 && (
              <div
                className={`relative w-full max-w-full md:max-w-xl flex justify-center transition-opacity duration-500 ${
                  imageFading ? "opacity-0" : "opacity-100"
                }`}
              >
                <img
                  src={images[currentImageIndex]}
                  alt={project.title}
                  className="max-h-80 w-auto object-contain rounded-2xl shadow-sm"
                />
              </div>
            )}

            {/* Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-4 top-[50%] -translate-y-1/2 p-2 bg-white/70 rounded-full text-gray-800 shadow-lg hover:bg-white transition z-20"
                  aria-label="Previous Image"
                >
                  &lt;
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-[50%] -translate-y-1/2 p-2 bg-white/70 rounded-full text-gray-800 shadow-lg hover:bg-white transition z-20"
                  aria-label="Next Image"
                >
                  &gt;
                </button>
              </>
            )}
          </div>

          {/* 🍎 TEXT BODY */}
          <div className="p-6 md:p-10 space-y-10 flex flex-col text-left bg-white">
            {/* Title */}
            <div className="space-y-1">
              <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
                {project.title}
              </h1>
            </div>

            {/* Details */}
            <div className="space-y-6 text-gray-700">
              {/* Overview */}
              <div>
                <h4 className="text-sm font-medium uppercase text-gray-500 mb-2">
                  Overview
                </h4>
                <p className="text-lg leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>

              {/* Technical Narrative */}
              <div>
                <h4 className="text-sm font-medium uppercase text-gray-500 mb-2 pt-4">
                  Technical Narrative
                </h4>
                {project.longDescription ? (
                  <p className="whitespace-pre-wrap text-base leading-relaxed pt-1">
                    {project.longDescription}
                  </p>
                ) : (
                  <p className="text-gray-500 italic text-base pt-1">
                    No detailed narrative provided for this project.
                  </p>
                )}
              </div>
            </div>

            {/* 🔗 Buttons */}
            <div className="flex flex-col space-y-3 pt-6">
              {renderLinkButton(project.liveLink, true, "live")}
              {renderLinkButton(project.githubLink, false, "github")}

              {project.pdfUrl && (
                <button
                  onClick={handlePdfDownload}
                  className="w-full py-3 rounded-2xl font-medium text-base tracking-tight transition-all duration-200 active:scale-[0.99] shadow-[0_4px_16px_rgba(0,0,0,0.05)] bg-white/70 border border-gray-200 text-gray-800 hover:bg-white"
                >
                  Download Documentation (PDF)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
