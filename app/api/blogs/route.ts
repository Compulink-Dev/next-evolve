// app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Blog from '../../../models/blogs';
import { connectDB } from '../../../lib/connectToDB';
import fs from 'fs';
import path from 'path';

connectDB();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const date = formData.get('date') as string;
    const imageFile = formData.get('image') as File | null;
    const existingImageUrl = formData.get('imageUrl') as string | null;

    if (!title || !description || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let imageUrl = existingImageUrl || '';

    if (imageFile) {
      // Process the image file
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Create a unique filename
      const timestamp = Date.now();
      const ext = path.extname(imageFile.name);
      const filename = `blog-${timestamp}${ext}`;
      
      // Define the path in the public folder
      const publicPath = path.join(process.cwd(), 'public', 'uploads', filename);
      
      // Ensure the uploads directory exists
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      
      // Write the file
      //@ts-ignore
      fs.writeFileSync(publicPath, buffer);
      
      // Set the URL that will be stored in the database
      imageUrl = `/uploads/${filename}`;
    }

    const newBlog = await Blog.create({ 
      title, 
      imageUrl, 
      description, 
      date: new Date(date) 
    });

    return NextResponse.json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
    try {
      const blogs = await Blog.find().sort({ date: -1 }); // Sort by newest first
      return NextResponse.json({ blogs });
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
  
  