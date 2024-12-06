export const dynamic = "force-dynamic"

import { connectDB } from "@/lib/connectToDB"
import Hosts from "@/models/hosts"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { name, company, position, bio, imageUrl } = await req.json()
    await connectDB()
    await Hosts.create({ name, company, position, bio, imageUrl })
    return NextResponse.json({ message: "Hosts Created" }, { status: 201 })
}


export async function GET() {
    await connectDB()
    const hosts = await Hosts.find()
    return NextResponse.json({ hosts })
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id")
    await connectDB()
    await Hosts.findByIdAndDelete(id)
    return NextResponse.json({ message: "Hosts Deleted" }, { status: 201 })
}