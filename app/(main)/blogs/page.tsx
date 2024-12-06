'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Title from '../_components/title';
import Image from 'next/image';
import { Loader } from 'lucide-react';

interface BlogPost {
    _id: string;
    title: string;
    description: string;
    date: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/blogs');
                if (!res.ok) {
                    throw new Error('Failed to fetch blog posts');
                }
                const data = await res.json();

                // Ensure the response contains an array of blog posts under the 'blogs' key
                if (Array.isArray(data.blogs)) {
                    setPosts(data.blogs);
                } else {
                    throw new Error('Expected an array of blog posts');
                }
            } catch (error) {
                setError('Failed to load blog data');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div className="p-8 flex items-center justify-center">
        <div className="flex gap-2 items-center">
            <p className=''>Loading...</p>
            <Loader className='animate-spin' />
        </div>
    </div>;
    if (error) return <p>{error}</p>;

    return (
        <main className="container mx-auto p-6 bg-purple-950 text-white">
            <Title title="Blog" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <article key={post._id} className="border p-4 rounded-lg shadow hover:shadow-md">
                        <Image width={100} height={100} src={'/bg2.jpg'} alt="logo" className="w-full rounded" />
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold mb-2">
                                <Link href={`/blogs/${post._id}`}>{post.title}</Link>
                            </h2>
                            <p className="text-sm text-gray-300">{new Date(post.date).toLocaleDateString()}</p>
                            <p className="mt-3 text-gray-500 line-clamp-5">{post.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}