export default function Contact() {
  return (
    <section id="contact" className="py-20 px-8 text-center">
      <h2 className="text-3xl font-semibold mb-6">Contact Me</h2>
      <p className="text-gray-600 mb-4">
        Interested in working together or just want to say hi?
      </p>
      <a
        href="mailto:gavinjunior@example.com"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Send an Email
      </a>
    </section>
  );
}
