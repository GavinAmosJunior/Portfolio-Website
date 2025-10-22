// /src/app/components/HeaderWrapper.jsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; // Assuming Navbar is in the same directory

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Check if the current route starts with /admin
  const isAdminRoute = pathname.startsWith("/admin");

  // Only render the Navbar if we are NOT on an admin route
  if (isAdminRoute) {
    return null; // Don't render anything, effectively hiding the navbar
  }

  // Render the Navbar on all other pages
  return <Navbar />;
}
