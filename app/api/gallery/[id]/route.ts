// app/api/gallery/[id]/route.ts
import { connectDB } from '@/lib/connectToDB';
import Gallery from '@/models/gallery';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();

    if (!params.id) {
      return NextResponse.json(
        { error: 'Missing item ID' },
        { status: 400 }
      );
    }

    const updatedItem = await Gallery.findByIdAndUpdate(
      params.id,
      {
        $set: {
          title: body.title,
          description: body.description,
          date: new Date(body.date),
          imageUrl: body.imageUrl,
          videoUrl: body.videoUrl || '',
          gallery: body.gallery || [],
          videos: body.videos || []
        }
      },
      { new: true }
    );

    if (!updatedItem) {
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json(
      { error: 'Failed to update gallery item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const deletedItem = await Gallery.findByIdAndDelete(params.id);
    if (!deletedItem) {
      return NextResponse.json(
        { error: 'Gallery item not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete gallery item' },
      { status: 500 }
    );
  }
}