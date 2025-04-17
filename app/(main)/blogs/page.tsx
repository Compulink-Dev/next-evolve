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
  imageUrl: string;
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
        setPosts(data.blogs || []);
      } catch (error) {
        setError('Failed to load blog data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return (
    <div className="p-8 flex items-center justify-center">
      <div className="flex gap-2 items-center">
        <p>Loading...</p>
        <Loader className="animate-spin" />
      </div>
    </div>
  );

  if (error) return (
    <div className="p-8 text-center text-red-500">
      {error} - Please try again later
    </div>
  );

  return (
    <div className="bg-purple-950 min-h-screen">
      <main className="container mx-auto p-6">
        <Title title="Blog" />
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No blog posts found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article 
                key={post._id} 
                className="bg-purple-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-video w-full">
                  <Image
                    src={post.imageUrl || '/placeholder.jpg'}
                    alt={`Featured image for ${post.title}`}
                    fill
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 hover:text-purple-300 transition-colors">
                    <Link href={`/blogs/${post._id}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-purple-300 mb-3">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-300 line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}