import { connectDB } from '@/lib/connectToDB';
import summit from '@/models/summit';
import { NextResponse } from 'next/server';


export async function GET() {
  await connectDB();
  try {
    const events = await summit.find({});
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching events' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectDB();
  try {
    const body = await request.json();
    const event = new summit(body);
    await event.save();
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating event' },
      { status: 400 }
    );
  }
}