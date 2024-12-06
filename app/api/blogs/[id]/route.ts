import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/connectToDB';
import Blog from '../../../../models/blogs';

connectDB();

// Get a blog by ID (GET)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ blog });
    } catch (error) {
        console.error('Error fetching blog:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Update a blog (PATCH)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const updates = await req.json();

    try {
        // Validate required fields
        const { title, description, imageUrl, date } = updates;
        if (!title || !description || !imageUrl || !date) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedBlog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Blog updated successfully', blog: updatedBlog }, { status: 200 });
    } catch (error) {
        console.error('Error updating blog:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Delete a blog (DELETE)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
