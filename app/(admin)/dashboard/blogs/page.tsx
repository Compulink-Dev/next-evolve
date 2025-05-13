export const dynamic = "force-dynamic"; // 👈 Force server-side rendering

import React from "react";
import Link from "next/link";
import { connectDB } from "../../../../lib/connectToDB";
import Blog from "../../../../models/blogs";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const metadata = { title: "Blogs Dashboard" };

export default async function BlogsPage() {
  await connectDB();
  const blogs = await Blog.find(); // Fetch all blogs

  console.log("Blogs : ", blogs);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Blogs</h1>
        <Button className="bg-purple-950 hover:bg-purple-500">
          <Link href="/dashboard/blogs/new" className="flex items-center gap-2">
            <PlusIcon size={16} />
            <p className="">Create New Blog</p>
          </Link>
        </Button>
      </div>
      <ul className="space-y-6">
        {blogs.map((blog: any) => (
          <li key={blog._id} className="p-4 border rounded-md">
            <h2 className="font-bold text-lg">{blog.title}</h2>
            <p>{blog.description.slice(0, 100)}...</p>
            <Button className="bg-purple-950 hover:bg-purple-600 mt-2">
              <Link href={`/dashboard/blogs/${blog._id}`} className="">
                Edit/Delete
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
