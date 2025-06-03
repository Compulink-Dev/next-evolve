import { connectDB } from "@/lib/connectToDB"
import Speakers from "@/models/speakers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: Request, { params }: any) {
    const { id } = params
    await connectDB()
    const speaker = await Speakers.findOne({ _id: id })
    return NextResponse.json({ speaker }, { status: 200 })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params
    const { name, company, position, bio, imageUrl,timeline } = await req.json()
    await connectDB()
    await Speakers.findByIdAndUpdate(id, { name, company, position, bio, imageUrl, timeline })
    return NextResponse.json({ message: "Speaker Updated" }, { status: 200 })
}