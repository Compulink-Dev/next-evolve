
import About from "@/models/about"
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/connectToDB"

export async function GET(req: Request, { params }: any) {
    const { id } = params
    await connectDB()
    const about = await About.findOne({ _id: id })
    return NextResponse.json({ about }, { status: 200 })
}
