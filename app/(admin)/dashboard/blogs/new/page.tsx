'use client';
import React from 'react';
import BlogForm from '../_components/BlogForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleCreate = async (data: any) => {
        setLoading(true);
        try {
            const res = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push('/dashboard/blogs'); // Redirect to blogs list
            } else {
                throw new Error('Failed to create blog');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Create Blog</h1>
            <BlogForm defaultValues='' onSubmit={handleCreate} loading={loading} />
        </div>
    );
}
