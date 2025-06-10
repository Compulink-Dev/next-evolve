
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/connectToDB';
import CustomSponsorship from '@/models/customSponsorship';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectDB(); // Connect to MongoDB
    
    const { userId } = auth(); // Or get your session differently
    
    const {
      name,
      budget,
      objectives,
      benefits,
      contactName,
      contactEmail,
    } = await req.json();

    if (!budget || !objectives || !benefits || !contactName || !contactEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const customSponsorship = new CustomSponsorship({
      name: name || 'Custom Package',
      budget: parseFloat(budget),
      objectives,
      benefits,
      contactName,
      contactEmail,
      userId: userId || null,
    });

    await customSponsorship.save();

    return NextResponse.json(customSponsorship, { status: 201 });
  } catch (error: any) {
    console.error('Error creating custom sponsorship:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}