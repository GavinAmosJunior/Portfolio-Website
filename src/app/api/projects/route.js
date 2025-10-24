// /src/app/api/projects/route.js

import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// --- SECURITY CHECK (Remains Correct) ---
function checkAuthFromRequest(request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token || token !== process.env.API_SECRET_TOKEN) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid or missing API token." },
      { status: 401 }
    );
  }
  return null;
}
// ---------------------------------

// --- 1. READ (GET) ---
// Public route — anyone can fetch project data
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("PortfolioDB");
    const projects = await db.collection("projects").find({}).toArray();

    // 🍎 FINAL FIX 1: Map through projects to ensure the main card has a single imageUrl
    const formattedProjects = projects.map((project) => ({
      ...project,
      // If imageUrls exists (new data), use the first one for the card display.
      // Otherwise, use the old imageUrl field (for existing data).
      imageUrl:
        Array.isArray(project.imageUrls) && project.imageUrls.length > 0
          ? project.imageUrls[0]
          : project.imageUrl,
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { message: "Failed to fetch projects", error: error.message },
      { status: 500 }
    );
  }
}

// --- 2. CREATE (POST) ---
export async function POST(request) {
  const authError = checkAuthFromRequest(request);
  if (authError) return authError;

  try {
    const client = await clientPromise;
    const db = client.db("PortfolioDB");
    const collection = db.collection("projects");

    const body = await request.json();

    if (!body.title || !body.shortDescription) {
      return NextResponse.json(
        { message: "Missing required fields (title or short description)." },
        { status: 400 }
      );
    }

    // 🛠️ IMAGE FIX: Promote imageBase64 array to imageUrls
    if (body.imageBase64) {
      body.imageUrls = body.imageBase64;
      delete body.imageBase64;
    }

    // PDF FIX
    if (body.pdfBase64) {
      body.pdfUrl = body.pdfBase64;
      delete body.pdfBase64;
    }

    // Clean up outdated fields
    delete body.description;

    if ("_id" in body) {
      if (!body._id || body._id === "" || body._id === null) {
        delete body._id;
      }
    }

    const result = await collection.insertOne(body);
    return NextResponse.json(
      { message: "Project created successfully", projectId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to add project:", error);
    return NextResponse.json(
      {
        message: "Internal server error while adding project.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// --- 3. UPDATE (PATCH) ---
export async function PATCH(request) {
  const authError = checkAuthFromRequest(request);
  if (authError) return authError;

  try {
    const client = await clientPromise;
    const db = client.db("PortfolioDB");
    const collection = db.collection("projects");

    const body = await request.json();
    const { _id, imageBase64, pdfBase64, ...updateFields } = body;

    if (!_id) {
      return NextResponse.json(
        { message: "Project ID is required for updating." },
        { status: 400 }
      );
    }

    // 🛠️ IMAGE FIX: If new images were submitted, promote them
    if (imageBase64) {
      updateFields.imageUrls = imageBase64;
    }
    if (pdfBase64) {
      updateFields.pdfUrl = pdfBase64;
    }

    // Clean up outdated fields
    delete updateFields.description;

    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json(
      {
        message: "Internal server error while updating project.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// --- 4. DELETE (DELETE) ---
export async function DELETE(request) {
  const authError = checkAuthFromRequest(request);
  if (authError) return authError;
  // ... (rest of DELETE logic is correct)
  try {
    const client = await clientPromise;
    const db = client.db("PortfolioDB");
    const collection = db.collection("projects");

    const body = await request.json();
    const projectId = body.id;

    if (!projectId) {
      return NextResponse.json(
        { message: "Project ID is required for deletion." },
        { status: 400 }
      );
    }

    const result = await collection.deleteOne({ _id: new ObjectId(projectId) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json(
      {
        message: "Internal server error while adding project.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
