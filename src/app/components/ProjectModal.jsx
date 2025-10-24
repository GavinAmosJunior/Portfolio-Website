// /src/app/components/ProjectModal.jsx
"use client";
import React, { useState, useEffect } from "react";

export default function ProjectModal({ project, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 🛠️ GALLERY FIX 1: Ensure the array of images is retrieved from the project object
  // It now safely defaults to the main card image if the array is empty.
  const images =
    Array.isArray(project?.imageUrls) && project.imageUrls.length > 0
      ? project.imageUrls
      : project?.imageUrl
      ? [project.imageUrl]
      : [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        if (!isOpen) {
          document.body.style.overflow = "unset";
        }
      }, 300);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  // Utility Functions
  const goToNext = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const goToPrev = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

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

  // 🛠️ FIX 2: Added keyType to link rendering for unique keys
  const renderLinkButton = (url, isPrimary, keyType) => {
    if (!url) return null;

    let text = "View Project";
    let colorClass = isPrimary
      ? "bg-black text-white hover:bg-gray-800"
      : "border border-gray-300 text-gray-700 hover:bg-gray-100";

    if (url.includes("github")) {
      text = "View Code on GitHub";
      colorClass = "border border-gray-300 text-gray-700 hover:bg-gray-100";
    } else if (url.includes("youtube") || url.includes("vimeo")) {
      text = "Watch Demonstration";
      colorClass = "bg-red-600 text-white hover:bg-red-700";
    } else if (isPrimary) {
      text = "Visit Live Project";
      colorClass = "bg-black text-white hover:bg-gray-800";
    }

    return (
      <a
        // 🍎 FIX 3: Combine URL and type for a unique key
        key={`${url}-${keyType}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full"
      >
        <button
          className={`w-full font-medium py-3 rounded-xl transition duration-300 ${colorClass}`}
        >
          {text}
        </button>
      </a>
    );
  };

  return (
    // 1. OVERLAY (Smooth Fade + Backdrop Blur)
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300
        ${
          isOpen
            ? "opacity-100 bg-gray-900/70 backdrop-blur-md"
            : "opacity-0 pointer-events-none"
        } 
      `}
      onClick={onClose}
    >
      {/* 2. MODAL CONTAINER (Smooth Scale-In/Out) */}
      <div
        className={`
          bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col transition duration-300
          ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"} 
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition z-50 text-2xl font-light"
          aria-label="Close"
        >
          &times;
        </button>

        {/* 3. CONTENT AREA - Responsive Layout */}
        <div className="flex flex-col md:flex-row h-full overflow-y-auto">
          {/* A. IMAGE GALLERY AREA */}
          <div className="md:w-1/2 flex-shrink-0 bg-gray-100 relative overflow-hidden flex flex-col justify-center items-center p-6 md:p-0">
            {/* Main Image Display */}
            <div className="w-full h-full flex items-center justify-center relative">
              <img
                // 🍎 FIX 4: Image now points to the current index of the image array
                src={images[currentImageIndex] || ""}
                alt={project.title}
                className="max-h-full max-w-full object-contain p-4 rounded-3xl"
              />

              {/* Gallery Navigation Controls */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrev}
                    className="absolute left-2 p-2 bg-white/70 rounded-full text-gray-800 shadow-md hover:bg-white transition hidden md:block"
                    aria-label="Previous Image"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-2 p-2 bg-white/70 rounded-full text-gray-800 shadow-md hover:bg-white transition hidden md:block"
                    aria-label="Next Image"
                  >
                    &gt;
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation (Visible on both mobile/desktop for full gallery experience) */}
            {images.length > 1 && (
              <div className="flex justify-center p-2 space-x-2 overflow-x-auto w-full border-t bg-white">
                {images.map((src, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-12 h-12 border-2 ${
                      index === currentImageIndex
                        ? "border-gray-900"
                        : "border-transparent"
                    } cursor-pointer transition`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={src}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* B. TEXT AND DETAILS AREA */}
          <div className="md:w-1/2 p-8 space-y-8 flex flex-col">
            {/* Title and Summary */}
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
              {project.title}
            </h1>

            {/* Detail/Narrative Area (Scrollable) */}
            <div className="overflow-y-auto flex-grow space-y-4 text-gray-700 pr-2">
              {/* Overview Section */}
              <div>
                <h4 className="text-sm font-medium uppercase text-gray-500 mb-1">
                  Overview
                </h4>
                <p className="text-lg">{project.shortDescription}</p>
              </div>

              {/* Technical Narrative Section */}
              <div>
                <h4 className="text-sm font-medium uppercase text-gray-500 mb-1 pt-4">
                  Technical Narrative
                </h4>
                {project.longDescription ? (
                  <p className="whitespace-pre-wrap text-base leading-relaxed">
                    {project.longDescription}
                  </p>
                ) : (
                  <p className="text-gray-500 italic text-base">
                    No detailed narrative provided for this project.
                  </p>
                )}
              </div>
            </div>

            {/* CTA Buttons (Final Fix: Removed Border-T) */}
            <div className="flex flex-col space-y-3 pt-6">
              {/* 1. PRIMARY LINK (Live Project / Demo / Video) */}
              {renderLinkButton(project.liveLink, true, "live")}

              {/* 2. SECONDARY LINK (GitHub) */}
              {renderLinkButton(project.githubLink, false, "github")}

              {/* 3. PDF DOWNLOAD Link */}
              {project.pdfUrl && (
                <button
                  onClick={handlePdfDownload}
                  className="w-full border border-gray-300 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-100 transition shadow-md"
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
