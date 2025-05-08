import { connectDB } from '@/lib/connectToDB';
import Gallery from '@/models/gallery';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const galleryItems = await Gallery.find().sort({ date: -1 });
    return NextResponse.json(galleryItems);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    console.log('Received body:', body);
    // Validate required fields
    if (!body.title || !body.description || !body.date || !body.imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newItem = new Gallery({
      title: body.title,
      description: body.description,
      date: new Date(body.date),
      imageUrl: body.imageUrl,
      videoUrl: body.videoUrl || '',
      gallery: body.gallery || [],
      videos: body.videos || [] // Make sure this is properly included
    });

    console.log('Saving to DB:', newItem); // Debug log

    await newItem.save();
    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json(
      { error: 'Failed to create gallery item' },
      { status: 500 }
    );
  }
}