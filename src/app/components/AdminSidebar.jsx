import React from "react";

// Define the available views centrally (Now only PROJECTS remains)
export const ADMIN_VIEWS = {
  PROJECTS: "PROJECTS",
  // SETTINGS view ID has been removed
};

export default function AdminSidebar({ currentView, setView, handleLogout }) {
  // navItems array now only contains Projects
  const navItems = [
    { id: ADMIN_VIEWS.PROJECTS, label: "Projects Section" },
    // Removed: { id: ADMIN_VIEWS.SETTINGS, label: "Site Settings" },
  ];

  return (
    // FIX: Ensures full height (h-full) and fixed width (w-56)
    <nav className="w-56 bg-white border-r border-gray-200 p-4 pt-8 flex flex-col h-full shadow-2xl shadow-gray-200/50 flex-shrink-0">
      <h2 className="text-2xl font-bold mb-10 text-neutral-900 px-2">
        Admin Panel
      </h2>

      <div className="flex-grow space-y-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center w-full px-4 py-3 rounded-xl transition duration-200 text-sm font-medium ${
                isActive
                  ? "bg-neutral-100 text-neutral-800 shadow-sm"
                  : "text-gray-600 hover:bg-neutral-50"
              }`}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-white bg-red-500 hover:bg-red-600 transition duration-200 mt-10 shadow-md"
      >
        <span>Logout</span>
      </button>
    </nav>
  );
}
