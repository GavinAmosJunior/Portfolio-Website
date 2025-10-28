"use client";

import { useState } from "react";

export default function ContactRoutePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent successfully! Thank you.");
        // Clear form fields
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await res.json();
        setStatus(
          `Failed to send message: ${errorData.message || "Server Error"}`
        );
      }
    } catch (error) {
      setStatus("A network error occurred. Please try again.");
      console.error("Contact form network error:", error);
    }
  };

  return (
    // 🍎 FINAL NAVIGATION FIX: Added id="contact" to the section element
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-white"
    >
      <div className="max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Contact Me
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 shadow-md rounded-2xl p-8 space-y-6 border border-gray-100"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          <button
            type="submit"
            disabled={status === "Sending..."}
            className="w-full bg-gray-800 text-white font-medium py-3 rounded-xl hover:bg-gray-700 transition"
          >
            {status === "Sending..." ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <p
              className={`text-center text-sm ${
                status.includes("Failed") ? "text-red-500" : "text-green-600"
              }`}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
