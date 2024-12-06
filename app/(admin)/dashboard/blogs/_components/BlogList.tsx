import React from 'react';
import Link from 'next/link';

type Blog = {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
};

interface BlogListProps {
    blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
    return (
        <div className="space-y-4">
            {blogs.length === 0 ? (
                <p className="text-gray-500">No blogs available.</p>
            ) : (
                blogs.map((blog) => (
                    <div key={blog._id} className="p-4 border rounded-md">
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-40 object-cover mb-4 rounded-md"
                        />
                        <h2 className="font-bold text-lg">{blog.title}</h2>
                        <p className="text-gray-600">{blog.description.slice(0, 100)}...</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-sm text-gray-500">
                                {new Date(blog.date).toLocaleDateString()}
                            </span>
                            <Link
                                href={`/dashboard/blogs/${blog._id}`}
                                className="text-blue-500 underline">
                                Edit/Delete
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default BlogList;
