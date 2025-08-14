import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectToDB';
import Registration2026 from '@/models/registration2026';
import { z } from 'zod';

// Enhanced schemas with better error messages
const attendeeSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters" }),
  jobTitle: z.string().min(2, { message: "Job title must be at least 2 characters" }),
  phone: z.string().min(6, { message: "Phone number must be at least 6 characters" }),
});

const exhibitorSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters" }),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(6, { message: "Phone number must be at least 6 characters" }),
  boothSize: z.enum(['10x10', '10x20', '20x20', 'custom']),
  products: z.string().min(6, { message: "Please provide at least 6 characters describing your products" }),
  employeesAttending: z.string().min(1, { message: "At least 1 employee must attend" }),
});

const sponsorSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters" }),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(6, { message: "Phone number must be at least 6 characters" }),
  sponsorshipLevel: z.enum(['silver', 'gold', 'platinum', 'diamond']),
  marketingMaterials: z.boolean(),
});

export async function POST(request: Request) {
  await connectDB();
  
  try {
    const body = await request.json();
    
    if (!body.type) {
      return NextResponse.json(
         { 
          error: 'Validation failed',
          message: 'Registration type is required',
          details: [{ field: 'type', message: 'Registration type is required' }]
        },
        { status: 400 }
      );
    }

    // Validate based on registration type
    let validatedData;
    try {
      switch (body.type) {
        case 'attendee':
          validatedData = attendeeSchema.parse(body);
          break;
        case 'exhibitor':
          validatedData = exhibitorSchema.parse(body);
          break;
        case 'sponsor':
          validatedData = sponsorSchema.parse(body);
          break;
        default:
          return NextResponse.json(
            { error: 'Invalid registration type' },
            { status: 400 }
          );
      }
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const errorMessages = validationError.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        return NextResponse.json(
              { 
            error: 'Validation failed',
            message: 'Please check your input',
            details: errorMessages
          },
          { status: 400 }
        );
      }
      throw validationError;
    }

    // Check for existing registration with the same email and type
    const existingRegistration = await Registration2026.findOne({ 
      email: validatedData.email,
      type: body.type
    });
    
    if (existingRegistration) {
      return NextResponse.json(
         { 
          error: 'Duplicate registration',
          message: `${validatedData.email} is already registered as a ${body.type}`,
          details: [{ field: 'email', message: 'Email already registered for this type' }]
        },
        { status: 400 }
      );
    }

    // Create new registration
    const registration = new Registration2026({
      ...validatedData,
      type: body.type,
      year: 2026,
      registrationDate: new Date(),
    });

    await registration.save();

    return NextResponse.json(
      { 
        success: true,
        registration,
        message: 'Registration successful' 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        error: 'Registration failed',
        message: error.message || 'An unexpected error occurred',
        details: error.details || []
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await connectDB();
  
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    if (!type) {
      return NextResponse.json(
        { error: 'Type parameter is required' },
        { status: 400 }
      );
    }

    let query: any = { year: 2026 };
    
    // Convert the tab name to the stored type
    if (type === 'attendees') query.type = 'attendee';
    else if (type === 'exhibitors') query.type = 'exhibitor';
    else if (type === 'sponsors') query.type = 'sponsor';
    else {
      return NextResponse.json(
        { error: 'Invalid type parameter' },
        { status: 400 }
      );
    }

    const registrations = await Registration2026.find(query)
      .sort({ registrationDate: -1 })
      .lean();

    return NextResponse.json(registrations);
    
  } catch (error: any) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations', message: error.message },
      { status: 500 }
    );
  }
}