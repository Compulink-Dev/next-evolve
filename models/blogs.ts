import mongoose, { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 100,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true, // Adds `createdAt` and `updatedAt` fields
    }
);

// Check if model already exists to avoid overwriting
const Blog = models.Blog || model('Blog', BlogSchema);

export default Blog;
