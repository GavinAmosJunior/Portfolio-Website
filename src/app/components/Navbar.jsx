"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setIsSticky(true);
      else setIsSticky(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 py-4 px-8 flex justify-between items-center transition-all duration-300 backdrop-blur-sm ${
        isSticky ? "bg-white/90 shadow-md" : "bg-white/0 shadow-none"
      }`}
    >
      {/* Left side: refresh link */}
      <a
        href="/"
        className="text-2xl font-bold text-gray-900 hover:opacity-80 transition"
      >
        Gavin Amos Junior
      </a>

      {/* Right side: nav links */}
      <div className="flex gap-6 text-gray-700">
        <a href="#about" className="hover:text-gray-900 transition">
          About
        </a>
        <a href="#projects" className="hover:text-gray-900 transition">
          Projects
        </a>
        <a href="#contact" className="hover:text-gray-900 transition">
          Contact
        </a>
      </div>
    </nav>
  );
}
