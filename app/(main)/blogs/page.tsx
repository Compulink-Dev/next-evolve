import Link from "next/link";
import Title from "../_components/title";
import Image from "next/image";

// Mock data or fetch from an API
const posts = [
    {
        id: "1",
        title: "Welcome to the Evolve ICT Summit Blog",
        excerpt: "Discover the latest insights and updates from the ICT world.",
        date: "2024-12-05",
        slug: "welcome-to-evolve-ict-summit",
    },
];

export default function BlogPage() {

    // const res = await fetch("https://your-api.com/blog/posts");
    // const posts = await res.json();


    return (
        <main className="container mx-auto p-6 bg-purple-950 text-white">
            <Title title='Blog' />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <article key={post.id} className="border p-4 rounded-lg shadow hover:shadow-md">
                        <Image width={100} height={100} src={'/bg2.jpg'} alt="logo" className="w-full rounded" />
                        <div className="p-4 ">
                            <h2 className="text-2xl font-semibold mb-2">
                                <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                            </h2>
                            <p className="text-sm text-gray-300">{new Date(post.date).toLocaleDateString()}</p>
                            <p className="mt-3 text-gray-500">{post.excerpt}</p>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}
