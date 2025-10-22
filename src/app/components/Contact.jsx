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

    const res = await fetch("/api/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("Message sent!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("Something went wrong. Try again.");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-16">
      <div className="max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Get in Touch
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
            className="w-full bg-gray-800 text-white font-medium py-3 rounded-xl hover:bg-gray-700 transition"
          >
            Send Message
          </button>

          {status && (
            <p className="text-center text-sm text-gray-600">{status}</p>
          )}
        </form>
      </div>
    </section>
  );
}
