// app/api/update-role/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/connectToDB";
import Registration from "@/models/registration";
import { authOptions } from "../auth/[...nextauth]/options";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" }, 
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();
    const { email, role } = body;

    // Verify the requesting user has permission
    if (session.user.email !== email && session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden" }, 
        { status: 403 }
      );
    }

    const updatedUser = await Registration.findOneAndUpdate(
      { email },
      { $set: { role } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json({message: 'Role updated', updatedUser});
  } catch (error) {
    console.error("Error updating role:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}