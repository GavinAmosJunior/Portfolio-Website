"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Local imports
import ProjectForm from "../components/ProjectForm";
import ProjectListAdmin from "../components/ProjectListAdmin";
import AdminSidebar, { ADMIN_VIEWS } from "../components/AdminSidebar";

// Global function to handle logout
const handleLogout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminToken");
  }
  window.location.href = "/admin/login";
};

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  // Defaulting to PROJECTS, as this is the only view now
  const [currentView, setCurrentView] = useState(ADMIN_VIEWS.PROJECTS);

  const fetchProjects = async (setter) => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setter(data);
      } else {
        console.error("Failed to fetch projects data from API.");
      }
    } catch (error) {
      console.error("Network error during project fetch:", error);
    }
  };

  useEffect(() => {
    async function initDashboard() {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          router.push("/admin/login");
          return;
        }
        setIsAuth(true);
        fetchProjects(setProjects);
      }
    }
    initDashboard();

    // Ensure view stays on PROJECTS
    setCurrentView(ADMIN_VIEWS.PROJECTS);
  }, [router]);

  const handleProjectAction = (actionType) => {
    if (actionType !== "CLEAR") {
      fetchProjects(setProjects);
    }
    setCurrentProject(null);
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isAuth) {
    return <div className="text-center mt-20">Loading Dashboard...</div>;
  }

  const renderContentView = () => {
    // FIX: Simplified to ONLY render the Project Management block.
    // The switch/case for SETTINGS is completely removed.
    return (
      <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-16">
        <h1 className="text-4xl font-light tracking-tight text-gray-800 mb-6">
          Project Management
        </h1>

        <ProjectForm
          currentProject={currentProject}
          onSave={handleProjectAction}
        />

        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          <h2 className="text-3xl font-light tracking-tight text-gray-800 mb-6">
            Existing Projects
          </h2>
          <ProjectListAdmin
            projects={projects}
            onEdit={handleEdit}
            onDelete={handleProjectAction}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* 1. Sidebar Component (Only shows 'Projects' link) */}
      <AdminSidebar
        currentView={currentView}
        setView={setCurrentView}
        handleLogout={handleLogout}
      />

      {/* 2. Main Content Area (Scrollable) */}
      <main className="flex-1 overflow-y-auto">{renderContentView()}</main>
    </div>
  );
}
