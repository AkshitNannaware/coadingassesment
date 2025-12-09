// import { NextResponse } from "next/server";
// import { dataStore } from "@/lib/data";

// export async function GET() {
//   try {
//     const projects = dataStore.getProjects();
//     return NextResponse.json({ 
//       success: true, 
//       projects 
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: error?.message || "Failed to fetch projects" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     const body = await request.json();
    
//     if (!body.name || !body.description) {
//       return NextResponse.json(
//         { success: false, message: "Project name and description are required" },
//         { status: 400 }
//       );
//     }
    
//     const project = dataStore.addProject({
//       name: body.name,
//       description: body.description,
//       image: body.image,
//       category: body.category,
//     });
    
//     return NextResponse.json({ 
//       success: true, 
//       message: "Project added successfully",
//       project 
//     }, { status: 201 });
    
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: error?.message || "Unable to add project" },
//       { status: 400 }
//     );
//   }
// }

// export async function PUT(request) {
//   try {
//     const body = await request.json();
    
//     if (!body.id) {
//       return NextResponse.json(
//         { success: false, message: "Project ID is required" },
//         { status: 400 }
//       );
//     }
    
//     const project = dataStore.updateProject(body.id, {
//       name: body.name,
//       description: body.description,
//       image: body.image,
//       category: body.category,
//     });
    
//     return NextResponse.json({ 
//       success: true, 
//       message: "Project updated successfully",
//       project 
//     });
    
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: error?.message || "Unable to update project" },
//       { status: 400 }
//     );
//   }
// }

// export async function DELETE(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');
    
//     console.log("DELETE request for project ID:", id);
    
//     if (!id) {
//       return NextResponse.json(
//         { success: false, message: "Project ID is required" },
//         { status: 400 }
//       );
//     }
    
//     const deletedProject = dataStore.deleteProject(id);
    
//     return NextResponse.json({ 
//       success: true, 
//       message: "Project deleted successfully",
//       project: deletedProject 
//     });
    
//   } catch (error) {
//     console.error("DELETE error:", error);
//     return NextResponse.json(
//       { success: false, message: error?.message || "Unable to delete project" },
//       { status: 400 }
//     );
//   }
// }






































import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data";

export async function GET() {
  try {
    const projects = dataStore.getProjects();
    console.log("GET /api/projects - Total projects:", projects.length);
    return NextResponse.json({ 
      success: true, 
      projects 
    });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("POST /api/projects - Body:", body);
    
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
    
    console.log("POST /api/projects - Created project:", project);
    
    return NextResponse.json({ 
      success: true, 
      message: "Project added successfully",
      project 
    }, { status: 201 });
    
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Unable to add project" },
      { status: 400 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    console.log("PUT /api/projects - Body:", body);
    
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
    
    console.log("PUT /api/projects - Updated project:", project);
    
    return NextResponse.json({ 
      success: true, 
      message: "Project updated successfully",
      project 
    });
    
  } catch (error) {
    console.error("PUT /api/projects error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Unable to update project" },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  try {
    console.log("DELETE /api/projects - URL:", request.url);
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    console.log("DELETE /api/projects - ID from query params:", id);
    
    if (!id) {
      console.log("DELETE /api/projects - No ID provided");
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }
    
    console.log("DELETE /api/projects - Deleting project with ID:", id);
    
    const deletedProject = dataStore.deleteProject(id);
    
    console.log("DELETE /api/projects - Deleted project:", deletedProject);
    console.log("DELETE /api/projects - Remaining projects:", dataStore.getProjects().length);
    
    return NextResponse.json({ 
      success: true, 
      message: "Project deleted successfully",
      project: deletedProject 
    });
    
  } catch (error) {
    console.error("DELETE /api/projects error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Unable to delete project" },
      { status: 400 }
    );
  }
}