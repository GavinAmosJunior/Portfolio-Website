// src/components/Projects.jsx

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects from API:", err);
      }
    }
    fetchProjects();
  }, []);

  // Handlers for Modal
  const openModal = (projectData) => {
    setSelectedProject(projectData);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setTimeout(() => {
      document.body.style.overflow = "unset";
    }, 300);
  };

  return (
    <section
      id="projects"
      className="py-20 px-8 text-center bg-white dark:bg-white"
    >
      <h2 className="text-4xl font-extrabold mb-12">Projects</h2>

      {projects.length === 0 ? (
        <p className="text-lg text-gray-500">
          Fetching projects or no data found...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              onClick={() => openModal(project)}
              className="p-0 bg-white shadow-xl hover:shadow-2xl transition duration-300 rounded-2xl text-left overflow-hidden border border-gray-100 transform hover:-translate-y-1 cursor-pointer"
            >
              {/* 🍎 FINAL FIX 2: Check for a valid URL before rendering Image tag */}
              {project.imageUrl &&
                typeof project.imageUrl === "string" &&
                project.imageUrl.length > 5 && (
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      // Now safe to use project.imageUrl as the API guarantees it's the first image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="transition duration-500 ease-in-out hover:scale-105"
                    />
                  </div>
                )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.shortDescription || project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RENDER THE MODAL COMPONENT */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
