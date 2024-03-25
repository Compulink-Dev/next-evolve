export const dynamic = "force-dynamic"

import { connectToDB } from "@/lib/connectToDB"
import Test from "@/models/test"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { title, description, color, imageUrl } = await req.json()
    await connectToDB()
    await Test.create({ title, description, color, imageUrl })
    return NextResponse.json({ message: "Test Created" }, { status: 201 })
}


export async function GET() {
    await connectToDB()
    const test = await Test.find()
    return NextResponse.json({ test })
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id")
    await connectToDB()
    await Test.findByIdAndDelete(id)
    return NextResponse.json({ message: "Test Deleted" }, { status: 201 })
}