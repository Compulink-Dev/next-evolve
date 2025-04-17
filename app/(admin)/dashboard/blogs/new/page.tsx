'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BlogForm from '../_components/BlogForm';


export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const handleCreate = async (formData: FormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        body: formData, // No Content-Type header needed for FormData
      });

      if (res.ok) {
        router.push('/dashboard/blogs');
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
      <BlogForm onSubmit={handleCreate} loading={loading} />
    </div>
  );
}