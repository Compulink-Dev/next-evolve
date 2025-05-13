// app/api/registration/route.ts
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectToDB';
import Registration from '@/models/registration';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - No Clerk user ID' }, 
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();
    
    // Check if user already exists
    const existingUser = await Registration.findOne({ 
      $or: [
        { email: body.email },
        { clerkUserId: userId }
      ]
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Create new registration
    const registration = await Registration.create({
      ...body,
      clerkUserId: userId
    });

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}