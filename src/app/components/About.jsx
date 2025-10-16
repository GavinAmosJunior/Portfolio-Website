"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-8 md:px-16 flex flex-col md:flex-row items-center gap-12 bg-gray-50"
    >
      {/* LEFT SIDE - IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex justify-center md:w-1/2"
      >
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/assets/about.jpg"
            alt="About me image"
            width={320}
            height={320}
            className="object-cover w-full h-full"
          />
        </div>
      </motion.div>

      {/* RIGHT SIDE - TEXT */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="md:w-1/2 text-center md:text-left"
      >
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">About Me</h2>
        <p className="text-gray-600 max-w-lg">
          {/* Replace this with your own text */}
          I’m an engineering student studying robotics. I build apps and
          websites while making music in my free time.
        </p>
      </motion.div>
    </section>
  );
}
