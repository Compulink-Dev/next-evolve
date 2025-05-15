import { connectDB } from "@/lib/connectToDB";
import Attendee from "@/models/attendee";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    // Check if user already registered
    const existingAttendee = await Attendee.findOne({ userId: data.userId });
    if (existingAttendee) {
      return NextResponse.json(
        { error: "You're already registered as an attendee" },
        { status: 400 }
      );
    }

    const attendee = new Attendee({
      userId: data.userId,
      seatNumber: data.seatNumber,
      additionalInfo: data.additionalInfo,
      paymentProof: data.paymentProof,
      status: "pending",
    });

    await attendee.save();

    return NextResponse.json(
      { message: "Attendee registered successfully", attendee },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to register attendee" },
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
