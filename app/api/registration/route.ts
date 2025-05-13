import { NextResponse } from 'next/server';
import Registration, { IRegistration, RegistrationType } from '@/models/registration';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { connectDB } from '@/lib/connectToDB';
import bcrypt from 'bcryptjs';
import { onlineRegistrationSchema } from '@/lib/validators';


// GET all registrations (admin only)
export async function GET() {
  await connectDB();
  
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    return NextResponse.json(registrations);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}

// POST create new registration
export async function POST(request: Request) {
  try {
    await connectDB();
    console.log('Successfully connected to database');
    
    const body = await request.json();
    console.log('Raw request body:', body);

    // Validate the data
    const validatedData = onlineRegistrationSchema.parse(body);
    console.log('Validated data:', JSON.stringify(validatedData, null, 2));

    // Check for existing user
    const existingUser = await Registration.findOne({ email: validatedData.email });
    if (existingUser) {
      console.log('User already exists:', existingUser.email);
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create new user
    console.log('Attempting to create user...');
    const registration = await Registration.create(validatedData);
    console.log('Successfully created user:', registration.email);

    return NextResponse.json(registration, { status: 201 });
  } catch (error: any) {
    console.error('Full error:', error);
    if (error.name === 'ZodError') {
      console.error('Validation errors:', error.errors);
    }
    if (error.name === 'MongoServerError') {
      console.error('MongoDB error:', error.message);
    }
    return NextResponse.json(
      { 
        error: 'Registration failed',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}