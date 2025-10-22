// /src/app/components/ProjectForm.jsx
"use client";
import { useState, useEffect } from "react";

// Helper function to create the initial state from the prop
const getInitialState = (project) => ({
  _id: project?._id || "",
  title: project?.title || "",
  description: project?.description || "",
  link: project?.link || "",
  imageUrl: project?.imageUrl || "",
});

export default function ProjectForm({ currentProject, onSave }) {
  // ✅ FIX 1: Use a function to initialize state based on prop, ensuring it runs on mount
  const [formData, setFormData] = useState(() =>
    getInitialState(currentProject)
  );
  const [status, setStatus] = useState("");

  // ✅ FIX 2: Use useEffect *only* to synchronize internal state when the parent prop changes.
  // This is the cleanest way to manage prop-to-state synchronization.
  useEffect(() => {
    setFormData(getInitialState(currentProject));
    setStatus("");
  }, [currentProject]); // Reruns whenever edit/cancel/save changes currentProject

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ... (handleSubmit function is exactly the same as before, no changes needed there) ...
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    const AUTH_TOKEN =
      typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    if (!AUTH_TOKEN) {
      setStatus("Error: Authorization token missing.");
      return;
    }

    const method = formData._id ? "PATCH" : "POST";

    try {
      const res = await fetch("/api/projects", {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        const message = formData._id
          ? "Project updated successfully! Form reset."
          : "Project added successfully! Form reset.";

        setStatus(message);

        // This triggers the parent's handleProjectAction, which resets currentProject to null
        if (onSave) onSave();
      } else {
        setStatus(`Error: ${data.message || "Failed to save project."}`);
      }
    } catch (error) {
      console.error("API submission error:", error);
      setStatus("An unexpected network error occurred.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h3 className="text-2xl font-bold mb-4">
        {formData._id ? "Edit Project" : "Add New Project"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... (Input fields remain the same) ... */}
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <textarea
          name="description"
          placeholder="Brief Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="3"
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="url"
          name="link"
          placeholder="Live Link (URL)"
          value={formData.link}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL or Path"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-gray-800 text-white font-semibold py-2 rounded-lg hover:bg-black transition disabled:opacity-50"
            disabled={status.includes("Submitting")}
          >
            {formData._id ? "Save Changes" : "Add Project"}
          </button>

          {formData._id && (
            <button
              type="button"
              // Call onSave() to reset the parent's currentProject state
              onClick={onSave}
              className="w-auto px-4 bg-red-100 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-200 transition"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {status && (
        <p
          className={`mt-3 text-sm font-medium ${
            status.includes("Error") ? "text-red-500" : "text-green-600"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}
