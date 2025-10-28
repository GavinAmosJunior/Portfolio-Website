"use client";
import { motion } from "framer-motion";

export default function Hero() {
  const name = "Gavin Amos Junior";
  const tagline = "Web & App Developer, Musician"; // This is the hero text

  // --- BUTTON TRANSITION (INSTANT & SMOOTH) ---
  const buttonHoverProps = {
    whileHover: {
      scale: 1.02,
      boxShadow: "0px 4px 15px rgba(0,0,0,0.08)",
    },
    whileTap: {
      scale: 0.98,
    },
    transition: { type: "tween", duration: 0.15, ease: "easeInOut" },
  };

  return (
    <section
      id="hero"
      className="pt-24 pb-16 md:min-h-screen max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-8 md:px-16 bg-white"
    >
      {/* 1. LEFT SIDE - IMAGE (Remains the same) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center"
      >
        <div className="w-56 h-56 md:w-96 md:h-96 rounded-[2rem] overflow-hidden bg-neutral-100">
          <img
            src="/assets/profile.png"
            alt="Profile picture"
            className="object-cover w-full h-full grayscale-[10%]"
          />
        </div>
      </motion.div>

      {/* 2. RIGHT SIDE - TEXT */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center md:text-left self-center md:pl-8"
      >
        <p className="text-xl font-medium text-gray-500 mb-2 tracking-wide">
          Hi, I'm {name}
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-10 tracking-tighter leading-tight">
          {tagline}
        </h1>

        {/* 3. BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          {/* View My Work (Primary) */}
          <motion.a
            href="#projects"
            {...buttonHoverProps}
            className="w-full sm:w-auto px-7 py-3 bg-white border border-gray-300 text-gray-900 rounded-xl transition font-medium text-lg tracking-tight leading-none shadow-sm hover:shadow-md"
          >
            View My Work
          </motion.a>

          {/* 🎵 My Music (New Button) */}
          <motion.a
            href="https://open.spotify.com/artist/4E5H3YFXDzuGa5K2TNcJ83?si=8oppefCzQSyGjOb-57EO7w" // replace with your actual link
            target="_blank"
            rel="noopener noreferrer"
            {...buttonHoverProps}
            className="w-full sm:w-auto px-7 py-3 text-gray-600 rounded-xl transition font-light text-lg tracking-tight leading-none hover:text-gray-900"
          >
            My Music
          </motion.a>

          {/* Contact Me (Secondary) */}
          <motion.a
            href="#contact"
            {...buttonHoverProps}
            className="w-full sm:w-auto px-7 py-3 text-gray-600 rounded-xl transition font-light text-lg tracking-tight leading-none hover:text-gray-900"
          >
            Contact Me
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
