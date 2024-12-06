'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogForm from '../_components/BlogForm';

// Define the Blog type
interface Blog {
    title: string;
    imageUrl: string;
    description: string;
    date: string; // Or use 'Date' if it's a Date object
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const router = useRouter();
    const [blog, setBlog] = useState<Blog | null>(null); // Explicitly type the state as Blog or null
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/${id}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch blog data');
                }
                const data = await res.json();
                setBlog(data.blog); // Assuming the response has a blog field
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlog();
    }, [id]);

    const handleEdit = async (data: Blog) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/blogs/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push('/dashboard/blogs');
            } else {
                throw new Error('Failed to update blog');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/blogs/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                router.push('/dashboard/blogs');
            } else {
                throw new Error('Failed to delete blog');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!blog) return <p>Loading...</p>;

    // Format the date
    const formattedDate = new Date(blog.date).toLocaleDateString();

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Edit Blog</h1>
            <div>
                <h2 className="text-lg font-semibold">Date: {formattedDate}</h2>
            </div>
            <BlogForm defaultValues={blog} onSubmit={handleEdit} loading={loading} />
            <button
                onClick={handleDelete}
                className="mt-4 p-2 w-full bg-red-500 text-white rounded"
                disabled={loading}>
                Delete
            </button>
        </div>
    );
}
