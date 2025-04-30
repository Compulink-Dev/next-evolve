// app/api/registration/route.ts
import { connectDB } from "@/lib/connectToDB"
import Registration from "@/models/registration"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { 
      firstName,
      lastName,
      jobTitle,
      company,
      phoneNumber,
      country,
      state,
      email,
      password,
      confirmPassword, // Extract but don't use
      industry,
      position,
      companySize 
    } = await req.json()

    await connectDB()

    // Check if user already exists
    const existingUser = await Registration.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    await Registration.create({
      firstName,
      lastName,
      jobTitle,
      company,
      phoneNumber,
      country,
      state,
      email,
      password: hashedPassword,
      industry,
      position,
      companySize
    })

    return NextResponse.json(
      { message: "User registered successfully" }, 
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    )
  }
}
export async function PUT(req: NextRequest) {
    const { id, status } = await req.json()
    await connectDB()
    const visitor = await Registration.findByIdAndUpdate(id, { status }, { new: true })
    return NextResponse.json({ visitor })
}

export async function GET() {
    await connectDB()
    const visitors = await Registration.find()
    return NextResponse.json({ visitors })
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id")
    await connectDB()
    await Registration.findByIdAndDelete(id)
    return NextResponse.json({ message: "Visitor Deleted" }, { status: 201 })
}


