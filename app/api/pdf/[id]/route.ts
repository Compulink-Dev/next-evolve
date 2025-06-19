// app/api/pdf/[id]/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const attendee = await db.collection('attendees').findOne({
      _id: new ObjectId(params.id),
    });

    if (!attendee) {
      return NextResponse.json(
        { error: 'Attendee not found' },
        { status: 404 }
      );
    }

    const pdfBuffer = Buffer.from(attendee.pdfBase64, 'base64');

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="EVOLVE-ICT-Attendee-Card-${attendee.name}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error fetching PDF:', error);
    return NextResponse.json(
      { error: 'Failed to fetch PDF' },
      { status: 500 }
    );
  }
}