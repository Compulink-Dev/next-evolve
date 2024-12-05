import Link from "next/link";

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
        <main className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6">Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <article key={post.id} className="border p-4 rounded-lg shadow hover:shadow-md">
                        <h2 className="text-2xl font-semibold mb-2">
                            <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                        </h2>
                        <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
                        <p className="mt-3 text-gray-700">{post.excerpt}</p>
                    </article>
                ))}
            </div>
        </main>
    );
}
