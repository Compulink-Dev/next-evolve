import connect from "@/lib/database"
import Hosts from "@/models/hosts"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: any) {
    const { id } = params
    await connect()
    const host = await Hosts.findOne({ _id: id })
    return NextResponse.json({ host }, { status: 200 })
}
