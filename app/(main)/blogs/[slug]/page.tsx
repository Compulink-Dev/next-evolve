import { notFound } from "next/navigation";

const posts = [
    {
        id: "1",
        title: "Welcome to the Evolve ICT Summit Blog",
        content: "<p>Explore our insights on ICT innovation and the latest trends in the field.</p>",
        date: "2024-12-05",
        slug: "welcome-to-evolve-ict-summit",
    },
];

// Fetch post by slug
async function getPost(slug: string) {
    return posts.find((post) => post.slug === slug) || null;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug);

    // const res = await fetch(`https://your-api.com/blog/posts/${params.slug}`);
    // const post = await res.json();

    if (!post) {
        notFound();
    }

    return (
        <main className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-sm text-gray-500 mb-6">{new Date(post.date).toLocaleDateString()}</p>
            <article className="prose">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
        </main>
    );
}
