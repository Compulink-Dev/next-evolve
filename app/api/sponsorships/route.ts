import { connectDB } from "@/lib/connectToDB";
import Sponsorship from "@/models/sponsorship";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure Content-Type is multipart/form-data
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Expected multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const tier = formData.get("tier") as string;
    const amount = formData.get("amount") as string;
    const additionalInfo = formData.get("additionalInfo") as string;
    const paymentProofFile = formData.get("paymentProof") as File | null;
    const userId = formData.get("userId") as string;

    if (!tier || !amount || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let paymentProofUrl = "";

    if (paymentProofFile && paymentProofFile.name) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");

      try {
        await fs.access(uploadsDir);
      } catch {
        await fs.mkdir(uploadsDir, { recursive: true });
      }

      const timestamp = Date.now();
      const ext = paymentProofFile.name.split(".").pop();
      const filename = `payment-proof-${userId}-${timestamp}.${ext}`;
      const filePath = path.join("uploads", filename);
      paymentProofUrl = `/${filePath}`;

  
    }

    await Sponsorship.create({
      tier,
      amount: parseInt(amount),
      additionalInfo,
      user: userId,
      paymentProofUrl: paymentProofUrl || undefined,
      status: "pending",
    });

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
