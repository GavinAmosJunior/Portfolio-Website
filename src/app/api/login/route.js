// /src/app/api/login/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { password } = await request.json();

    // ✅ RESTORE: Use the secure environment variable
    const correctPassword = process.env.ADMIN_PASSWORD;

    const secretToken = process.env.API_SECRET_TOKEN;

    if (!correctPassword || !secretToken) {
      return NextResponse.json(
        { message: "Server configuration error. Check .env.local" },
        { status: 500 }
      );
    }

    // Server-side password comparison
    if (password === correctPassword) {
      // SUCCESS
      return NextResponse.json(
        { message: "Login successful", token: secretToken },
        { status: 200 }
      );
    } else {
      // FAILURE
      return NextResponse.json(
        { message: "Invalid password." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { message: "Internal server error during login." },
      { status: 500 }
    );
  }
}
