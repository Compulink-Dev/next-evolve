import { connectDB } from "@/lib/connectToDB";
import Sponsorship from "@/models/sponsorship";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { tier, amount, additionalInfo, paymentProof, userId } = body;

    if (!tier || !amount || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }



    if (!tier || !amount || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const parsedAmount = parseInt(amount);
    if (isNaN(parsedAmount)) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    let paymentProofUrl: string | undefined;


    const newSponsorship = new Sponsorship({
      tier,
      amount: parsedAmount,
      additionalInfo,
      paymentProofUrl,
      userId,
      createdAt: new Date(),
    });

    await newSponsorship.save();

    return NextResponse.json(
      { message: "Sponsorship submitted", paymentProofUrl },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Sponsorship submission error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
