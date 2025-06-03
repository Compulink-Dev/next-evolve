import { connectDB } from "@/lib/connectToDB";
import Attendee from "@/models/attendee";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    console.log("Incoming attendee data:", data); // Add this for debugging

    // Validate required fields
    if (!data.userId || !data.seatNumber) {
      return NextResponse.json(
        { error: "userId and seatNumber are required" },
        { status: 400 }
      );
    }

    // Check for existing attendee
    const existingAttendee = await Attendee.findOne({
      $or: [{ userId: data.userId }, { seatNumber: data.seatNumber }],
    });

    if (existingAttendee) {
      const errorMessage = existingAttendee.userId.equals(data.userId)
        ? "You're already registered as an attendee"
        : "This seat number is already taken";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const attendee = new Attendee({
      userId: data.userId,
      seatNumber: data.seatNumber,
      additionalInfo: data.additionalInfo,
      status: data.status || "pending", // Default to pending_payment
    });

    await attendee.save();

    return NextResponse.json(
      { message: "Attendee registered successfully", attendee },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: `Failed to register attendee : , ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const attendees = await Attendee.find().populate("userId");
    return NextResponse.json(attendees);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendees" },
      { status: 500 }
    );
  }
}
