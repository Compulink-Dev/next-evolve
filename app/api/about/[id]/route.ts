import connect from "@/lib/database"
import About from "@/models/about"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: any) {
    const { id } = params
    await connect()
    const about = await About.findOne({ _id: id })
    return NextResponse.json({ about }, { status: 200 })
}
