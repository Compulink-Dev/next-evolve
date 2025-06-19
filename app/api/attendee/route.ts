import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectToDB';
import attendeeCard from '@/models/attendeeCard';
import { generateAttendeePDF } from '@/lib/pdfGenerator';

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();
    const { name, organization, imageUrl } = body;

    if (!name || !organization || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const attendee = new attendeeCard({
      name,
      organization,
      imageUrl,
    });

    await attendee.save();

    // Generate PDF and get public URL
    const { publicUrl } = await generateAttendeePDF(attendee);

    // Return JSON response with both the attendee data and public URL
    return NextResponse.json({
      _id: attendee._id,
      pdfPublicUrl: publicUrl,
      name: attendee.name,
      organization: attendee.organization,
      imageUrl: attendee.imageUrl
    });

  } catch (error) {
    console.error('Error creating attendee:', error);
    return NextResponse.json(
      { error: 'Failed to create attendee' },
      { status: 500 }
    );
  }
}