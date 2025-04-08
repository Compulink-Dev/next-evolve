import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Title from '../../_components/title';
import { Clock } from 'lucide-react';

interface BlogPost {
    _id: string;
    title: string;
    description: string;
    date: string;
    imageUrl?: string;
}

async function getPost(id: string): Promise<BlogPost | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`);
    if (!res.ok) return null;
    return (await res.json()).blog;
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
    const post = await getPost(params.id);
    if (!post) notFound(); // This must be called unconditionally

    return (
        <main className="container mx-auto p-6">
            <div className="flex gap-4">
                <Image 
                    width={600} 
                    height={400} 
                    src={post.imageUrl || '/bg2.jpg'} 
                    alt="Blog image" 
                    className="w-1/2 rounded" 
                />
                <div>
                    <Title title={post.title} />
                    <div className="flex gap-2 items-center mb-6 text-gray-500">
                        <Clock size={14} />
                        <p className="text-sm">
                            {new Date(post.date).toLocaleDateString()}
                        </p>
                    </div>
                    <article className="prose">
                        <div dangerouslySetInnerHTML={{ __html: post.description }} />
                    </article>
                </div>
            </div>
        </main>
    );
}