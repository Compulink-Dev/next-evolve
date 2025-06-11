import { NextRequest, NextResponse } from 'next/server';
import Exhibitor from '@/models/exhibitor';
import Registration from '@/models/registration'
import { connectDB } from '@/lib/connectToDB';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    require('@/models/registration')
    
    // Only fetch approved exhibitors if you want to show taken booths
    const exhibitors = await Exhibitor.find({ status: 'approved' })
      .populate('userId', 'firstName lastName email company phoneNumber');
      
    return NextResponse.json({ exhibitors });
  } catch (error) {
    console.error('Error fetching exhibitors:', error);
    return NextResponse.json(
      { error: "Failed to fetch exhibitors" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { boothNumber, paymentProof, additionalInfo,logoUrl,link } = body;

    // Check if booth is already taken (approved)
    const existing = await Exhibitor.findOne({ 
      boothNumber,
      status: 'approved'
    });
    
    if (existing) {
      return NextResponse.json({ message: 'Booth already taken' }, { status: 409 });
    }

    // Check if user already has a booth
    const userExhibitor = await Exhibitor.findOne({ userId: session.user.id });
    if (userExhibitor) {
      return NextResponse.json({ 
        message: 'You already have a booth assigned' 
      }, { status: 400 });
    }

    const exhibitor = await Exhibitor.create({
      userId: session.user.id,
      boothNumber,
      paymentProof,
      additionalInfo,
      logoUrl,
      link,
      status: 'pending' // Default status
    });

    return NextResponse.json(exhibitor, { status: 201 });
  } catch (error) {
    console.error('Error creating exhibitor:', error);
    return NextResponse.json(
      { error: "Failed to create exhibitor" },
      { status: 500 }
    );
  }
}