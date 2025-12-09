import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data";

// Handle GET request for admin panel
export async function GET() {
  try {
    const subscribers = dataStore.getSubscribers();
    return NextResponse.json({ 
      success: true, 
      subscribers 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch subscribers" 
      },
      { status: 500 }
    );
  }
}

// Handle POST request from newsletter form
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate email
    if (!body.email || !body.email.includes('@')) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Valid email is required" 
        },
        { status: 400 }
      );
    }
    
    const subscriber = dataStore.addSubscriber(body.email);
    
    return NextResponse.json(
      { 
        success: true, 
        message: "Successfully subscribed to newsletter",
        subscriber 
      }, 
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Unable to subscribe" 
      },
      { status: 400 }
    );
  }
}