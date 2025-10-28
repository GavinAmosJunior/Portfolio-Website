"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkBaseClass =
    "px-3 py-1 relative transition-all duration-300 ease-out";
  const linkHoverClass = `hover:text-black 
     shadow-none hover:shadow-[0_1px_0_rgba(0,0,0,0.8)] 
     active:shadow-[0_0px_0_rgba(0,0,0,0.8)]`;

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 py-4 px-8 flex justify-between items-center transition-all duration-300 backdrop-blur-sm ${
        isSticky ? "bg-white/90 shadow-md" : "bg-white/0 shadow-none"
      }`}
    >
      {/* Left side: Logo Image with smooth shrink on scroll */}
      <a
        href="/"
        className="flex items-center hover:opacity-80 transition-all duration-300"
      >
        <Image
          src="/assets/navbar.jpeg"
          alt="Logo"
          width={isSticky ? 28 : 40} // ✅ shrink when scrolling
          height={isSticky ? 28 : 40}
          priority
          className={`object-contain transition-all duration-300 ${
            isSticky ? "opacity-90" : "opacity-100"
          }`}
        />
      </a>

      {/* Right side: nav links */}
      <div className="flex gap-1 text-gray-700">
        <a href="#about" className={linkBaseClass + " " + linkHoverClass}>
          About
        </a>
        <a href="#projects" className={linkBaseClass + " " + linkHoverClass}>
          Projects
        </a>
        <a href="#contact" className={linkBaseClass + " " + linkHoverClass}>
          Contact
        </a>
      </div>
    </nav>
  );
}
