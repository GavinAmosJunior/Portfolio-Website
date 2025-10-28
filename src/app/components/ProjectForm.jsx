// /src/app/components/ProjectForm.jsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; // Import Image component for optimized images

// Helper function (LOGIC UNCHANGED)
const getInitialState = (project) => ({
  _id: project?._id || "",
  title: project?.title || "",
  shortDescription: project?.description || project?.shortDescription || "",
  longDescription: project?.longDescription || "",

  liveLink: project?.liveLink || "",
  githubLink: project?.githubLink || "",
  pdfUrl: project?.pdfUrl || "",

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
  const [filePreviews, setFilePreviews] = useState(formData.imageUrls); // Array for multiple image previews
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const initialState = getInitialState(currentProject);
    setFormData(initialState);
    setFilePreviews(initialState.imageUrls); // Set existing images as previews
    setStatus("");
  }, [currentProject]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFormData(getInitialState(null));
    setFilePreviews([]); // Clear all previews
    setStatus("");
    if (onSave) onSave("CLEAR");
  };

  const handleMultipleFileChange = (e, targetField) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const maxSizeMB = targetField === "pdfBase64" ? 15 : 5; // PDF 15MB, Image 5MB

    const newImageBase64s = [];
    const newFilePreviews = [];

    files.forEach((file) => {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setStatus(
          `Error: ${file.name} exceeds maximum size of ${maxSizeMB}MB.`
        );
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (targetField === "imageBase64") {
          newImageBase64s.push(reader.result);
          newFilePreviews.push(reader.result); // Add to previews
          setFormData((prev) => ({
            ...prev,
            [targetField]: [...(prev[targetField] || []), ...newImageBase64s], // Concatenate new base64s
          }));
          setFilePreviews((prev) => [...prev, ...newFilePreviews]); // Update file previews
        } else if (targetField === "pdfBase664") {
          setFormData((prev) => ({
            ...prev,
            [targetField]: reader.result,
          }));
        }
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        setStatus(`Error reading file ${file.name}.`);
      };
    });
  };

  const handleSubmit = async (e) => {
    /* ... */
  };

  return (
    <div
      className={`p-8 bg-white shadow-xl rounded-2xl border border-gray-100 transition duration-200 ${
        isHovering ? "shadow-2xl" : ""
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h3 className="text-3xl font-light tracking-tight text-gray-800 mb-6">
        {formData._id ? "Edit Project" : "Add New Project"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Fields: UNIFIED STYLING (Placeholder text is the label) */}
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition"
        />
        <textarea
          name="shortDescription"
          placeholder="Short Description"
          value={formData.shortDescription}
          onChange={handleChange}
          required
          rows="2"
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition"
        />
        <textarea
          name="longDescription"
          placeholder="Long Description"
          value={formData.longDescription}
          onChange={handleChange}
          rows="6"
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition"
        />

        {/* Link Fields */}
        <input
          type="url"
          name="liveLink"
          placeholder="Project Link (Optional)"
          value={formData.liveLink}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition"
        />
        <input
          type="url"
          name="githubLink"
          placeholder="Github Repo (Optional)"
          value={formData.githubLink}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition"
        />

        {/* File Upload Fields */}
        <label className="block text-sm font-medium text-gray-700 pt-2">
          Project Images (Upload Multiple Files for Gallery)
        </label>
        <input
          type="file"
          multiple
          onChange={(e) => handleMultipleFileChange(e, "imageBase64")}
          accept="image/png, image/jpeg, image/webp"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />

        {/* 🍎 FIX: Image Preview Area Restored */}
        {filePreviews.length > 0 && (
          <div className="mt-2 p-4 border border-gray-200 rounded-lg bg-gray-50 grid grid-cols-4 gap-3">
            <p className="col-span-4 text-xs font-medium mb-2">
              Current Image Previews:
            </p>
            {filePreviews.map((src, index) => (
              <div
                key={index}
                className="w-20 h-20 relative border border-gray-300 rounded overflow-hidden shadow-sm"
              >
                <Image
                  src={src}
                  alt={`Project preview ${index + 1}`}
                  fill // Use fill for better image handling in Next.js
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        )}

        <label className="block text-sm font-medium text-gray-700 pt-2">
          Project Documentation (PDF, Max 15MB)
        </label>
        <input
          type="file"
          onChange={(e) => handleMultipleFileChange(e, "pdfBase64")}
          accept="application/pdf"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-red-700 hover:file:bg-gray-200"
        />

        {/* Submit Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50 shadow-md"
          >
            {formData._id ? "Save Changes" : "Add Project"}
          </button>

          {/* 💡 Clear Form / Cancel Button (Conditional on mode) */}
          {formData._id ? (
            <button
              type="button"
              onClick={() => onSave("CANCEL")}
              className="w-auto px-4 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition shadow-md"
            >
              Cancel Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleClear}
              className="w-auto px-4 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition shadow-md"
            >
              Clear Form
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
