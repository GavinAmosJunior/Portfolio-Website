"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-16 px-8 md:px-16 bg-white"
    >
      {/* LEFT SIDE - IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex justify-center"
      >
        <div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden shadow-xl">
          <Image
            src="/assets/profile.png"
            alt="Profile picture"
            width={256}
            height={256}
            className="object-cover w-full h-full"
          />
        </div>
      </motion.div>

      {/* RIGHT SIDE - TEXT */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="text-center md:text-left"
      >
        <h1 className="text-5xl font-semibold text-gray-900 mb-4">
          Hi, I’m <span className="text-gray-700">Gavin Amos Junior</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-lg mb-6">
          Engineering Student | Web & App Developer
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href="#projects"
            className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-gray-900 rounded-full text-gray-900 hover:bg-gray-100 transition"
          >
            Contact Me
          </a>
        </div>
      </motion.div>
    </section>
  );
}
