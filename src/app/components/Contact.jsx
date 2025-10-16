"use client";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-8 bg-white text-center">
      <h2 className="text-3xl font-semibold mb-6">Contact Me</h2>
      <p className="text-lg text-gray-600 mb-6">
        Interested in working together or just want to say hi? You can reach me
        via email or social media.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="mailto:gavinjunior@example.com"
          className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition"
        >
          Send an Email
        </a>
        <a
          href="https://www.linkedin.com/in/gavinjunior"
          target="_blank"
          className="px-6 py-3 border border-gray-900 rounded-full text-gray-900 hover:bg-gray-100 transition"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/gavinjunior"
          target="_blank"
          className="px-6 py-3 border border-gray-900 rounded-full text-gray-900 hover:bg-gray-100 transition"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
