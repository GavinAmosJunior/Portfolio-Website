// /src/app/components/ProjectListAdmin.jsx
"use client";
import { useState } from "react";

// Component now accepts onDelete (a function to refetch data) and onEdit from parent
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
        setStatus("Project deleted successfully.");
        // FIX 2: Call the parent function to refetch the list (no full page reload)
        if (onDelete) onDelete();
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
    <div className="space-y-4">
      {projects.map((p) => (
        <div
          key={p._id}
          className="border rounded-lg p-4 bg-white shadow-sm flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-gray-600 text-sm">{p.description}</p>
          </div>
          <div className="space-x-2">
            {/* Added Edit button */}
            <button
              onClick={() => onEdit(p)}
              disabled={isDeleting}
              className="text-blue-500 hover:text-blue-700 disabled:text-gray-400"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(p._id)}
              disabled={isDeleting}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-gray-400"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
      {status && <p className="text-sm text-gray-500">{status}</p>}
    </div>
  );
}
