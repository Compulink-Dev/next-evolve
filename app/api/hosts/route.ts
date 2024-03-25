export const dynamic = "force-dynamic"

import { connectToDB } from "@/lib/connectToDB"
import Hosts from "@/models/hosts"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { name, company, position, bio, imageUrl } = await req.json()
    await connectToDB()
    await Hosts.create({ name, company, position, bio, imageUrl })
    return NextResponse.json({ message: "Hosts Created" }, { status: 201 })
}


export async function GET() {
    await connectToDB()
    const hosts = await Hosts.find()
    return NextResponse.json({ hosts })
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id")
    await connectToDB()
    await Hosts.findByIdAndDelete(id)
    return NextResponse.json({ message: "Hosts Deleted" }, { status: 201 })
}