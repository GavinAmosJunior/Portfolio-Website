export default function Projects() {
  return (
    <section id="projects" className="py-20 px-8 bg-gray-100 text-center">
      <h2 className="text-3xl font-semibold mb-6">Projects</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Project 1</h3>
          <p className="text-gray-600">Description of your first project.</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Project 2</h3>
          <p className="text-gray-600">Description of your second project.</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Project 3</h3>
          <p className="text-gray-600">Description of your third project.</p>
        </div>
      </div>
    </section>
  );
}
