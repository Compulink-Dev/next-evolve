export const dynamic = "force-dynamic"

import { connectDB } from "@/lib/connectToDB"
import Home from "@/models/home"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { title, description, color, imageUrl } = await req.json()
    await connectDB()
    await Home.create({ title, description, color, imageUrl })
    return NextResponse.json({ message: "Home Created" }, { status: 201 })
}


export async function GET() {
    await connectDB()
    const home = await Home.find()
    return NextResponse.json({ home })
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id")
    await connectDB()
    await Home.findByIdAndDelete(id)
    return NextResponse.json({ message: "Home Deleted" }, { status: 201 })
}