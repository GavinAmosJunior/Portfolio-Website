"use client";
import Image from "next/image";

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-8 bg-gray-50 text-center">
      <h2 className="text-3xl font-semibold mb-10">Projects</h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Engineering / University Projects */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
          <div className="h-48 relative">
            <Image
              src="/assets/project1.jpg"
              alt="Engineering Project"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Engineering</h3>
            <p className="text-gray-600 mb-4">University projects</p>
            <a
              href="#"
              className="inline-block px-5 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition"
            >
              View Projects
            </a>
          </div>
        </div>

        {/* Personal Development Projects */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
          <div className="h-48 relative">
            <Image
              src="/assets/project2.jpg"
              alt="Personal Development"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Software Development</h3>
            <p className="text-gray-600 mb-4">Web & app projects</p>
            <a
              href="#"
              className="inline-block px-5 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition"
            >
              View Projects
            </a>
          </div>
        </div>

        {/* Music */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
          <div className="h-48 relative">
            <Image
              src="/assets/profile.jpg"
              alt="Music"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">My Music</h3>
            <p className="text-gray-600 mb-4">
              Showcasing my music on Spotify.
            </p>
            <a
              href="#"
              className="inline-block px-5 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition"
            >
              Listen Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
