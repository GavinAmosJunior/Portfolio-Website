import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Gavin Junior | Portfolio",
  description:
    "Personal portfolio website built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
