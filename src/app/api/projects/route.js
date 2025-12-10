import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data";

export async function GET() {
  try {
    const projects = dataStore.getProjects();
    return NextResponse.json({ 
      success: true, 
      projects 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.description) {
      return NextResponse.json(
        { success: false, message: "Project name and description are required" },
        { status: 400 }
      );
    }
    
    const project = dataStore.addProject({
      name: body.name,
      description: body.description,
      image: body.image,
      category: body.category,
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Project added successfully",
      project 
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error?.message || "Unable to add project" },
      { status: 400 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }
    
    const project = dataStore.updateProject(body.id, {
      name: body.name,
      description: body.description,
      image: body.image,
      category: body.category,
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Project updated successfully",
      project 
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error?.message || "Unable to update project" },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }
    
    const deletedProject = dataStore.deleteProject(id);
    
    return NextResponse.json({ 
      success: true, 
      message: "Project deleted successfully",
      project: deletedProject 
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error?.message || "Unable to delete project" },
      { status: 400 }
    );
  }
}