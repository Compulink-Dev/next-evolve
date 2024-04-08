import { connectToDB } from "@/lib/connectToDB"
import Registration from "@/models/registration"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    const { firstName,
        lastName,
        jobTitle,
        company,
        phoneNumber,
        country,
        state,
        email,
        industry,
        position,
        companySize } = await req.json()
    await connectToDB()
    await Registration.create({
        firstName,
        lastName,
        jobTitle,
        company,
        phoneNumber,
        country,
        state,
        email,
        industry,
        position,
        companySize
    })
    return NextResponse.json({ message: "User Registered" }, { status: 201 })
}


