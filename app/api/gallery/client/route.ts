// app/api/gallery/client/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectToDB';
import Gallery from '@/models/gallery';

export async function GET() {
  try {
    await connectDB();
    const galleryItems = await Gallery.find()
      .sort({ date: -1 })
      .select('title imageUrl videoUrl description date gallery videos');
    return NextResponse.json(galleryItems);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}