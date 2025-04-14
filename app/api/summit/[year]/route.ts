import { connectDB } from '@/lib/connectToDB';
import summit from '@/models/summit';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { year: string } }
) {
  await connectDB();
  try {
    const event = await summit.findOne({ year: params.year });
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching event' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { year: string } }
) {
  await connectDB();
  try {
    const body = await request.json();
    const event = await summit.findOneAndUpdate(
      { year: params.year },
      body,
      { new: true }
    );
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating event' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { year: string } }
) {
  await connectDB();
  try {
    const event = await summit.findOneAndDelete({ year: params.year });
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Event deleted successfully' }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting event' },
      { status: 500 }
    );
  }
}