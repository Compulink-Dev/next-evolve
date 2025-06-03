// app/api/paynow/webhook/route.ts
import { connectDB } from "@/lib/connectToDB";
import Attendee from "@/models/attendee";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    // Extract reference from Paynow response
    const reference = data.reference;
    const paid = data.paid;

    // Check if this is an attendee payment
    if (reference.startsWith("Attendee-")) {
      const attendeeId = reference.split("-")[1];
      
      await Attendee.findByIdAndUpdate(attendeeId, {
        status: paid ? "paid" : "payment_failed",
        paymentStatus: paid ? "success" : "failed",
        paymentDate: new Date(),
      });

      return NextResponse.json({ success: true });
    }

    // Handle other payment types (sponsorships, etc.)

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}