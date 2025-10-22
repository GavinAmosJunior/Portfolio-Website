// /src/app/layout.js

import "./globals.css";
import HeaderWrapper from "./components/HeaderWrapper"; // ✅ IMPORT NEW WRAPPER

export const metadata = {
  title: "Gavin Junior | Portfolio",
  description:
    "Personal portfolio website built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Replace Navbar with the conditional wrapper */}
        <HeaderWrapper />
        {children}
      </body>
    </html>
  );
}
