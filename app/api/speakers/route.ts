export const dynamic = "force-dynamic"

import { connectDB } from "@/lib/connectToDB"
import Speakers from "@/models/speakers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { name, company, position, bio, imageUrl,timeline } = await req.json()
    await connectDB()
    await Speakers.create({ name, company, position, bio, imageUrl,timeline })
    return NextResponse.json({ message: "Speakers Created" }, { status: 201 })
}


export async function GET() {
 try {
    await connectDB()
    const speakers = await Speakers.find()
    return NextResponse.json({ speakers })
 } catch (error) {
      return NextResponse.json(
        {error: "Failed to fetch exhibitors"},
        {status: 500}
      )
 }
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id")
    await connectDB()
    await Speakers.findByIdAndDelete(id)
    return NextResponse.json({ message: "Test Deleted" }, { status: 201 })
}