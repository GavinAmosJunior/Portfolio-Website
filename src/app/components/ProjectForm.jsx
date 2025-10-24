// /src/app/components/ProjectForm.jsx
"use client";
import { useState, useEffect } from "react";

// Helper function to create the initial state from the prop
const getInitialState = (project) => ({
  _id: project?._id || "",
  title: project?.title || "",
  shortDescription: project?.description || project?.shortDescription || "",
  longDescription: project?.longDescription || "",

  liveLink: project?.liveLink || "",
  githubLink: project?.githubLink || "",
  pdfUrl: project?.pdfUrl || "",

  // GALLERY FIX: imageUrls is now an array
  imageUrls:
    project?.imageUrls || (project?.imageUrl ? [project.imageUrl] : []),

  imageBase64: null,
  pdfBase64: null,
});

export default function ProjectForm({ currentProject, onSave }) {
  const [formData, setFormData] = useState(() =>
    getInitialState(currentProject)
  );
  const [status, setStatus] = useState("");
  // Preview now stores the array of image URLs/Base64 strings
  const [filePreview, setFilePreview] = useState(formData.imageUrls[0] || "");

  useEffect(() => {
    const initialState = getInitialState(currentProject);
    setFormData(initialState);
    setFilePreview(initialState.imageUrls[0] || "");
    setStatus("");
  }, [currentProject]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🛠️ HANDLER FOR MULTIPLE FILE UPLOAD
  const handleMultipleFileChange = (e, targetField) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const promises = files.map((file) => {
      // Check file size limit (15MB per file)
      const maxSizeMB = 15;
      if (file.size > maxSizeMB * 1024 * 1024) {
        setStatus(
          `Error: File "${file.name}" exceeds maximum size of ${maxSizeMB}MB.`
        );
        throw new Error("File too large.");
      }

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((base64Array) => {
        if (targetField === "pdfBase64") {
          // PDF is always a single file, so we take the first element
          setFormData((prev) => ({ ...prev, pdfBase64: base64Array[0] }));
        } else {
          // IMAGES: Combine old URLs with new Base64 strings
          const existingUrls = formData.imageUrls.filter(
            (url) => !url.startsWith("data:")
          );
          const newImageUrls = [...existingUrls, ...base64Array];

          setFormData((prev) => ({
            ...prev,
            imageUrls: newImageUrls,
            // Send the full array for saving
            imageBase64: newImageUrls,
          }));
          setFilePreview(newImageUrls[0] || "");
        }
      })
      .catch((error) => {
        console.error("Error reading files:", error);
        setStatus("Error reading one or more files for upload.");
      });
  };
  // --------------------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    const AUTH_TOKEN =
      typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    if (!AUTH_TOKEN) {
      setStatus("Error: Authorization token missing.");
      return;
    }

    const payload = { ...formData };

    // Clean up unnecessary fields before sending
    delete payload.imageUrl;

    if (!payload.title || !payload.shortDescription) {
      setStatus("Error: Title or Brief Summary is required.");
      return;
    }

    const method = payload._id ? "PATCH" : "POST";

    try {
      const res = await fetch("/api/projects", {
        method,
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Project saved successfully! Resetting form...");
        if (onSave) onSave();

        // Reset internal state after success
        setFormData(getInitialState(null));
        setFilePreview(null);
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
        {/* ... (Title, Descriptions, Links remain the same) ... */}
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
          name="shortDescription"
          placeholder="Brief Summary for Card Display (Max 2 lines)"
          value={formData.shortDescription}
          onChange={handleChange}
          required
          rows="2"
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <textarea
          name="longDescription"
          placeholder="Detailed Technical Narrative for Modal Display (e.g., Robot Specs, Methods)"
          value={formData.longDescription}
          onChange={handleChange}
          rows="6"
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* DUAL LINK FIELDS */}
        <input
          type="url"
          name="liveLink"
          placeholder="Live Demo / Website Link (Optional)"
          value={formData.liveLink}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="url"
          name="githubLink"
          placeholder="GitHub Repository Link (Optional)"
          value={formData.githubLink}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* 🛠️ GALLERY FIX 4: MULTIPLE IMAGE UPLOAD FIELD */}
        <label className="block text-sm font-medium text-gray-700 pt-2">
          Project Images (Upload Multiple Files for Gallery)
        </label>
        <input
          type="file"
          // 🍎 FINAL FIX: Add the multiple attribute
          multiple
          onChange={(e) => handleMultipleFileChange(e, "imageBase64")}
          accept="image/png, image/jpeg, image/webp"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {/* PDF UPLOAD INPUT */}
        <label className="block text-sm font-medium text-gray-700 pt-2">
          Project Documentation (Upload PDF, Max 15MB)
        </label>
        <input
          type="file"
          onChange={(e) => handleMultipleFileChange(e, "pdfBase64")}
          accept="application/pdf"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
        />

        {/* Image Preview Area */}
        {formData.imageUrls.length > 0 && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <p className="text-xs font-medium mb-2">
              Image Gallery Preview ({formData.imageUrls.length} total):
            </p>
            <div className="flex space-x-2 overflow-x-auto h-20">
              {formData.imageUrls.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Preview ${index}`}
                  className="w-20 h-20 object-cover rounded shadow-md"
                />
              ))}
            </div>
          </div>
        )}

        {/* Submit Buttons (Remain the same) */}
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
