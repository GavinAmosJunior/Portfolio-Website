"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const DEFAULT_SETTINGS = {
  aboutParagraph:
    "I am a robotics engineering student learning web and app development.",
  aboutImageUrl: "/assets/about.jpg",
};

export default function About() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setSettings(DEFAULT_SETTINGS);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  if (isLoading) {
    return (
      <section
        id="about"
        className="py-24 px-8 md:px-16 bg-neutral-50 h-[400px]"
      >
        <div className="max-w-6xl mx-auto flex justify-center items-center h-full">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-32 px-8 md:px-16 bg-neutral-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">
        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center md:w-5/12"
        >
          <div className="w-72 h-72 md:w-80 md:h-80 rounded-[1.5rem] overflow-hidden shadow-xl bg-white">
            <img
              src={settings.aboutImageUrl}
              alt="About me"
              width={320}
              height={320}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = DEFAULT_SETTINGS.aboutImageUrl;
              }}
            />
          </div>
        </motion.div>

        {/* RIGHT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-7/12 text-center md:text-left self-center"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            About Me
          </h2>

          <p className="text-xl text-gray-800 leading-relaxed font-light">
            {settings.aboutParagraph}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
