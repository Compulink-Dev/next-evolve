import { NextResponse } from 'next/server';
import Registration, { IRegistration, RegistrationType } from '@/models/registration';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { connectDB } from '@/lib/connectToDB';
import bcrypt from 'bcryptjs';
import { offlineRegistrationSchema, onlineRegistrationSchema } from '@/lib/validators';


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

    // Determine which schema to use based on mode
    const schema = body.mode === 'online' ? onlineRegistrationSchema : offlineRegistrationSchema;
    
    // Validate the data
    const validatedData = schema.parse(body);
    console.log('Validated data:', JSON.stringify(validatedData, null, 2));

    // Check for existing user
    const existingUser = await Registration.findOne({ email: validatedData.email.toLowerCase() });
    
    
    if (existingUser) {
      console.log('User already exists:', existingUser.email);
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password if in online mode
    if (validatedData.mode === 'online') {
      const { password, ...rest } = validatedData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const registration = await Registration.create({
        ...rest,
        email: rest.email.toLowerCase(), // Ensure email is lowercase
        password: hashedPassword,
        type: rest.type // Ensure type is included
      });
      console.log('Successfully created online user:', registration.email);
      return NextResponse.json({
        success: true,
        registration,
        redirectUrl: `/${rest.type}/dashboard`
      }, { status: 201 });
    } else {
      // For offline registration
      const registration = await Registration.create({
        ...validatedData,
        email: validatedData.email.toLowerCase()
      });
      console.log('Successfully created offline user:', registration.email);
      return NextResponse.json({
        success: true,
        registration,
        redirectUrl: '/sign-in?registered=true'
      }, { status: 201 });
    }
  } catch (error: any) {
    console.error('Full error:', error);
    if (error.name === 'ZodError') {
      console.error('Validation errors:', error.errors);
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { 
        error: 'Registration failed',
        details: error.message,
      },
      { status: 500 }
    );
  }
}