import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data";

export async function GET() {
  try {
    const contacts = dataStore.getContacts();
    return NextResponse.json({ 
      success: true, 
      contacts 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch contacts" 
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.fullName || !body.email) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Full name and email are required" 
        },
        { status: 400 }
      );
    }
    
    const contact = dataStore.addContact({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone || "",
      city: body.city || "",
    });
    
    return NextResponse.json(
      { 
        success: true, 
        message: "Contact form submitted successfully",
        contact 
      }, 
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Unable to submit contact form" 
      },
      { status: 400 }
    );
  }
}