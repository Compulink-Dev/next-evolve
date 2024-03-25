export const dynamic = "force-dynamic"

import { connectToDB } from "@/lib/connectToDB"
import About from "@/models/about"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { title, description, color, imageUrl } = await req.json()
    await connectToDB()
    await About.create({ title, description, color, imageUrl })
    return NextResponse.json({ message: "About Created" }, { status: 201 })
}


export async function GET() {
    await connectToDB()
    const about = await About.find()
    return NextResponse.json({ about })
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id")
    await connectToDB()
    await About.findByIdAndDelete(id)
    return NextResponse.json({ message: "About Deleted" }, { status: 201 })
}