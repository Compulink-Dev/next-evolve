import { NextRequest, NextResponse } from 'next/server';
import Blog from '../../../models/blogs';
import { connectDB } from '../../../lib/connectToDB'
// Connect to the database
connectDB();

// Create a new blog (POST)
export async function POST(req: NextRequest) {
    try {
        const { title, imageUrl, description, date } = await req.json();

        if (!title || !imageUrl || !description || !date) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newBlog = await Blog.create({ title, imageUrl, description, date });

        return NextResponse.json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        console.error('Error creating blog:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Fetch all blogs (GET)
export async function GET() {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort by newest
        return NextResponse.json({ blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
