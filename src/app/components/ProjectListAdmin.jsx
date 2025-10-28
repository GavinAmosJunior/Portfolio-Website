// /src/app/components/ProjectListAdmin.jsx
"use client";
import { useState } from "react";

// Component now passes logic/data to parent
export default function ProjectListAdmin({ projects = [], onDelete, onEdit }) {
  const [status, setStatus] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setIsDeleting(true);
    try {
      // Token check is correct here, it reads 'adminToken' from localStorage
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setStatus("Error: Token missing. Please log in.");
        setIsDeleting(false);
        return;
      }

      const res = await fetch("/api/projects", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Project deleted successfully!");
        if (onDelete) onDelete(); // Refetch/update list in parent
      } else {
        setStatus(`Error: ${data.message || "Failed to delete project."}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setStatus("A network error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (projects.length === 0)
    return <p className="text-gray-600">No projects found. Add one above.</p>;

  return (
    <div className="space-y-3">
      {status && (
        <p
          className={`mb-4 p-3 rounded-lg text-sm font-medium ${
            status.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {status}
        </p>
      )}

      {projects.map((p) => (
        // 🍎 FINAL FIX: Restored list item styling
        <div
          key={p._id}
          className="p-4 bg-white shadow-md hover:shadow-lg transition duration-200 rounded-xl flex justify-between items-center border border-gray-100"
        >
          <div className="text-left max-w-[70%]">
            <h3 className="font-semibold text-gray-900 truncate">{p.title}</h3>
            {/* 🍎 FIX: Use shortDescription for the summary text */}
            <p className="text-gray-500 text-sm truncate">
              {p.shortDescription || p.description}
            </p>
          </div>
          <div className="flex space-x-3 items-center">
            {/* Edit Button - Icon look */}
            <button
              onClick={() => onEdit(p)}
              disabled={isDeleting}
              className="text-gray-500 hover:text-blue-600 transition p-1.5 rounded-full hover:bg-gray-100"
              aria-label={`Edit ${p.title}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.85 2.85 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </button>
            {/* Delete Button - Icon look */}
            <button
              onClick={() => handleDelete(p._id)}
              disabled={isDeleting}
              className="text-gray-500 hover:text-red-600 transition p-1.5 rounded-full hover:bg-gray-100"
              aria-label={`Delete ${p.title}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      ))}
      {status && <p className="text-sm text-gray-500">{status}</p>}
    </div>
  );
}
