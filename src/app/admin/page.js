// /src/app/admin/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProjectForm from "../components/ProjectForm";
import ProjectListAdmin from "../components/ProjectListAdmin";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  // LOGOUT FUNCTIONALITY (Remains correct)
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminToken");
    }
    router.push("/admin/login");
  };

  // --- Auth Check & Initial Fetch ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin/login");
      } else {
        setIsAuth(true);
        fetchProjects();
      }
    }
  }, [router]);

  // --- Data Fetcher ---
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        console.error("Failed to fetch projects.");
      }
    } catch (error) {
      console.error("Network error fetching projects:", error);
    }
  };

  // --- CRUD Handlers ---
  const handleProjectAction = () => {
    fetchProjects();
    setCurrentProject(null);
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isAuth) {
    return <div className="text-center mt-20">Loading Dashboard...</div>;
  }

  // --- Dashboard Layout (Cleaned, Polished, and Redundancy-Free) ---
  return (
    // Max width and padding adjusted for better breathing room
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      {/* Header with Dashboard Title and Logout Button */}
      {/* Lighter font for Apple aesthetic; generous bottom margin */}
      <div className="flex justify-between items-center mb-12 border-b pb-4">
        <h1 className="text-4xl font-light tracking-tight text-gray-800">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content: Generous vertical spacing between sections */}
      <div className="space-y-16">
        {/* 1. Add/Edit Project Form Container (Card Style) */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          {/* ❌ REDUNDANT HEADING REMOVED ❌ - ProjectForm handles its own title */}
          <ProjectForm
            currentProject={currentProject}
            onSave={handleProjectAction}
          />
        </div>

        {/* 2. Existing Projects List Container (Card Style) */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6">Existing Projects</h2>
          <ProjectListAdmin
            projects={projects}
            onEdit={handleEdit}
            onDelete={handleProjectAction}
          />
        </div>
      </div>
    </div>
  );
}
