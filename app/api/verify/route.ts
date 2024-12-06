import { connectDB } from "@/lib/connectToDB"
import Verify from "@/models/verify"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    const {
        name,
        email,
        password,
    } = await req.json()
    await connectDB()
    await Verify.create({
        name,
        email,
        password,
    })
    return NextResponse.json({ message: "User Verified" }, { status: 201 })
}


export async function GET() {
    await connectDB()
    const verify = await Verify.find()
    return NextResponse.json({ verify })
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id")
    await connectDB()
    await Verify.findByIdAndDelete(id)
    return NextResponse.json({ message: "Visitor verified" }, { status: 201 })
}


