import { connectDB } from "@/lib/connectToDB"
import Contact from "@/models/contact"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: any) {
    const { id } = params
    await connectDB()
    const contact = await Contact.findOne({ _id: id })
    return NextResponse.json({ contact }, { status: 200 })
}
