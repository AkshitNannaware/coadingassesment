import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ clients: dataStore.getClients() });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const client = dataStore.addClient({
      name: body.name,
      designation: body.designation,
      description: body.description,
      image: body.image,
    });
    return NextResponse.json({ 
      success: true, 
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
    const client = dataStore.updateClient(body.id, {
      name: body.name,
      designation: body.designation,
      description: body.description,
      image: body.image,
    });
    return NextResponse.json({ 
      success: true, 
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