export const dynamic = "force-dynamic"

import { connectToDB } from "@/lib/connectToDB"
import Speakers from "@/models/speakers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { name, company, position, bio, imageUrl } = await req.json()
    await connectToDB()
    await Speakers.create({ name, company, position, bio, imageUrl })
    return NextResponse.json({ message: "Speakers Created" }, { status: 201 })
}


export async function GET() {
    await connectToDB()
    const speakers = await Speakers.find()
    return NextResponse.json({ speakers })
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id")
    await connectToDB()
    await Speakers.findByIdAndDelete(id)
    return NextResponse.json({ message: "Test Deleted" }, { status: 201 })
}