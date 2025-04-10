import { connectDB } from "@/lib/connectToDB"
import Speakers from "@/models/speakers"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: any) {
    const { id } = params
    await connectDB()
    const speaker = await Speakers.findOne({ _id: id })
    return NextResponse.json({ speaker }, { status: 200 })
}
