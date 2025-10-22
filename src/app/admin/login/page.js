// /src/app/admin/login/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // ✅ This calls the secure server-side API where the password check occurs
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // ✅ Success: Token received from server is securely saved
        if (typeof window !== "undefined") {
          localStorage.setItem("adminToken", data.token);
        }
        router.push("/admin"); // Redirects to dashboard
      } else {
        // Show error message returned by the secure API
        setError(data.message || "Login failed. Check password.");
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      setError("A network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 w-full p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isLoading ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  );
}
