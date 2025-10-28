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
      <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">
        Projects
      </h2>

      {projects.length === 0 ? (
        <p className="text-lg text-gray-500">
          Loading Projects... Chotto Matte
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              onClick={() => openModal(project)}
              className="group cursor-pointer rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-100
                         shadow-md hover:shadow-2xl transition-all duration-500
                         hover:-translate-y-1 active:scale-[0.98] overflow-hidden"
            >
              {/* ✅ IMAGE */}
              {project.imageUrl &&
                typeof project.imageUrl === "string" &&
                project.imageUrl.length > 5 && (
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                    />
                  </div>
                )}

              {/* ✅ TEXT CONTENT (Now wrapped properly inside same rounded container) */}
              <div className="p-6 bg-white/80 transition-colors duration-300 group-hover:bg-white/90">
                <h3 className="text-xl font-semibold text-neutral-800 mb-2 group-hover:text-black">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-500 group-hover:text-neutral-700">
                  {project.shortDescription || project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ MODAL */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
