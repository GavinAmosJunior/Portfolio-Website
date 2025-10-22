// src/components/Projects.jsx

"use client";
import { useEffect, useState } from "react";
import Image from "next/image"; // Don't forget this import!

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        // Now using the clean, correct API route: /api/projects
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        // You can use the console in your browser to check for this error
        console.error("Error fetching projects from API:", err);
      }
    }

    fetchProjects();
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <section id="projects" className="py-20 px-8 text-center">
      <h2 className="text-4xl font-extrabold mb-12">Projects</h2>

      {projects.length === 0 ? (
        <p className="text-lg text-gray-500">
          {/* This will only show if the fetch fails or is still loading */}
          Fetching projects or no data found...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(
            (
              project // ⬅️ DYNAMIC MAPPING LOOP
            ) => (
              <div
                key={project._id}
                // Tailwind styles for a clean, modern card
                className="p-0 bg-white shadow-xl hover:shadow-2xl transition duration-300 rounded-2xl text-left overflow-hidden border border-gray-100 transform hover:-translate-y-1"
              >
                {project.imageUrl && (
                  <div className="relative h-56 w-full">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="transition duration-500 ease-in-out hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      className="text-blue-600 font-medium hover:underline flex items-center gap-1"
                      rel="noopener noreferrer"
                    >
                      View Project
                      {/* SVG icon for external link */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}
