import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Create buffer from ArrayBuffer
    const bytes = await file.arrayBuffer();
    const buffer = new Uint8Array(bytes);

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public/gallery');
    try {
      await fs.promises.mkdir(uploadDir, { recursive: true });
    } catch (err) {
      console.error('Error creating upload directory:', err);
    }

    // Generate unique filename
    const ext = path.extname(file.name);
    const baseName = path.basename(file.name, ext);
    const filename = `${baseName}-${Date.now()}${ext}`;
    const filepath = path.join(uploadDir, filename);

    // Write file
    await writeFile(filepath, buffer);

    return NextResponse.json({
      url: `/gallery/${filename}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}
