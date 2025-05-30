import { NextResponse } from 'next/server';
import Exhibitor from '@/models/exhibitor';
import { connectDB } from '@/lib/connectToDB';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Find the exhibitor record for this user
    const exhibitor = await Exhibitor.findOne({ 
      registrationId: session.user.id,
      status: 'approved' 
    });

    if (!exhibitor) {
      return NextResponse.json({ boothNumber: null }, { status: 200 });
    }

    return NextResponse.json({ boothNumber: exhibitor.boothNumber });
  } catch (error) {
    console.error('Error fetching booth:', error);
    return NextResponse.json(
      { error: "Failed to fetch booth information" },
      { status: 500 }
    );
  }
}