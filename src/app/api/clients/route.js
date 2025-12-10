import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data";

export async function GET() {
  try {
    const clients = dataStore.getClients();
    return NextResponse.json({ 
      success: true, 
      clients 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.designation) {
      return NextResponse.json(
        { success: false, message: "Name and designation are required" },
        { status: 400 }
      );
    }
    
    const client = dataStore.addClient({
      name: body.name,
      designation: body.designation,
      description: body.description,
      image: body.image,
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Client added successfully",
      client 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error?.message || "Unable to add client" },
      { status: 400 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { success: false, message: "Client ID is required" },
        { status: 400 }
      );
    }
    
    const client = dataStore.updateClient(body.id, {
      name: body.name,
      designation: body.designation,
      description: body.description,
      image: body.image,
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Client updated successfully",
      client 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error?.message || "Unable to update client" },
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
        { success: false, message: "Client ID is required" },
        { status: 400 }
      );
    }
    
    const deletedClient = dataStore.deleteClient(id);
    
    return NextResponse.json({ 
      success: true, 
      message: "Client deleted successfully",
      client: deletedClient 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error?.message || "Unable to delete client" },
      { status: 400 }
    );
  }
}