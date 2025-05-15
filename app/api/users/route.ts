// app/api/registration/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectToDB';
import Registration from '@/models/registration';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - No active session' },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();

    // Check if user already exists
    const existingUser = await Registration.findOne({
      $or: [
        { email: body.email },
        { email: session.user.email } // check against session email too
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
      email: session.user.email // force registration to associate with session email
    });

    return NextResponse.json(registration, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed', details: error.message },
      { status: 500 }
    );
  }
}
