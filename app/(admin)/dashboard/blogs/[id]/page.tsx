// app/(admin)/dashboard/blogs/[id]/page.tsx
'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogForm from '../_components/BlogForm';

interface Blog {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  date: string;
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error('Failed to fetch blog data');
        const data = await res.json();
        setBlog(data.blog);
      } catch (error) {
        console.error(error);
        setError('Failed to load blog');
      }
    };

    fetchBlog();
  }, [id]);

  const handleEdit = async (formData: FormData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to update blog');
      router.push('/dashboard/blogs');
    } catch (err) {
      console.error(err);
      setError('Failed to update blog');
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

      if (!res.ok) throw new Error('Failed to delete blog');
      router.push('/dashboard/blogs');
    } catch (err) {
      console.error(err);
      setError('Failed to delete blog');
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!blog) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Blog Post</h1>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-400"
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete Post'}
        </button>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600">
          Originally published: {new Date(blog.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
      
      <BlogForm 
        defaultValues={blog} 
        onSubmit={handleEdit} 
        loading={loading} 
      />
    </div>
  );
}