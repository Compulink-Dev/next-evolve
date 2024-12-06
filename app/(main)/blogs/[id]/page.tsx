'use client';
import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Title from '../../_components/title';
import { Clock } from 'lucide-react';

// Define the structure of the BlogPost
interface BlogPost {
    _id: string;
    title: string;
    description: string;
    date: string;
    imageUrl?: string;
}

async function getPost(id: string): Promise<BlogPost | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`);

    if (!res.ok) {
        console.error(`Failed to fetch blog post with id: ${id}`);
        return null;
    }

    const data = await res.json();
    console.log('Fetched Post:', data);  // Log the fetched post for debugging
    return data.blog || null; // Assuming the response has a `blog` field
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
    const post = await getPost(params.id);

    // If the post is not found, display a 404 page
    if (!post) {
        notFound();
    }

    const imageUrl = post.imageUrl || '/bg2.jpg';  // Default to '/bg2.jpg' if imageUrl is not present

    console.log('Image URL:', imageUrl);  // Log image URL to check its value

    return (
        <main className="container mx-auto p-6">
            <div className="flex gap-4">
                <Image width={100} height={100} src={imageUrl} alt="Blog image" className="w-1/2 rounded" />
                <div>
                    <Title title={post.title} />
                    <div className="flex gap-2 items-center mb-6 text-gray-500">
                        <Clock size={14} />
                        <p className="text-sm">{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                    <article className="prose">
                        <div dangerouslySetInnerHTML={{ __html: post.description }} />
                    </article>
                </div>
            </div>
        </main>
    );
}
