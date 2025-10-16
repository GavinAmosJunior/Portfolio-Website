export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Gavin Junior</h1>
      <div className="flex gap-6 text-gray-600">
        <a href="#about" className="hover:text-blue-600">
          About
        </a>
        <a href="#projects" className="hover:text-blue-600">
          Projects
        </a>
        <a href="#contact" className="hover:text-blue-600">
          Contact
        </a>
      </div>
    </nav>
  );
}
