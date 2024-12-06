import { connectDB } from "@/lib/connectToDB"
import Home from "@/models/home"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: any) {
    const { id } = params
    await connectDB()
    const home = await Home.findOne({ _id: id })
    return NextResponse.json({ home }, { status: 200 })
}
