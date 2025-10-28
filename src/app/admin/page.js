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
        if (currentView === ADMIN_VIEWS.PROJECTS) {
          fetchProjects(setProjects);
        }
      }
    }
    initDashboard();
  }, [router, currentView]);

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
    switch (currentView) {
      case ADMIN_VIEWS.PROJECTS:
        return (
          <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-16">
            <h1 className="text-4xl font-light tracking-tight text-gray-800 mb-6">
              Project Management
            </h1>

            {/* FIX: Removed "Add/Edit Project" text */}
            {/* <h2 className="text-3xl font-light tracking-tight text-gray-800 mb-4 px-1">
              Add/Edit Project
            </h2> */}
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

      case ADMIN_VIEWS.SETTINGS:
        return (
          <div className="max-w-4xl mx-auto p-6 md:p-10">
            <h1 className="text-4xl font-light tracking-tight text-gray-800 mb-6">
              Site Configuration
            </h1>
            <SettingsView />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <AdminSidebar
        currentView={currentView}
        setView={setCurrentView}
        handleLogout={handleLogout}
      />

      <main className="flex-1 overflow-y-auto">{renderContentView()}</main>
    </div>
  );
}
