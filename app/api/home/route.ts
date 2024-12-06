export const dynamic = "force-dynamic"

import { connectDB } from "@/lib/connectToDB"
import Home from "@/models/home"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { title, description, imageUrl } = await req.json()
    await connectDB()
    await Home.create({ title, description, imageUrl })
    return NextResponse.json({ message: "Home Created" }, { status: 201 })
}


export async function GET(req: Request, { params }: any) {
    const { id } = params
    await connectDB()
    const home = await Home.findOne({ _id: id })
    return NextResponse.json({ home }, { status: 200 })
}


export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id")
    await connectDB()
    await Home.findByIdAndDelete(id)
    return NextResponse.json({ message: "Home Deleted" }, { status: 201 })
}