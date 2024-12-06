import Image from "next/image";
import { notFound } from "next/navigation";
import Title from "../../_components/title";
import { Clock } from "lucide-react";

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
            <div className="flex gap-4">
                <Image width={100} height={100} src={'/bg2.jpg'} alt="logo" className="w-1/2 rounded" />
                <div className="">
                    <Title title={post.title} />
                    <div className="flex gap-2 items-center mb-6 text-gray-500">
                        <Clock size={14} />
                        <p className="text-sm  ">{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                    <article className="prose">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </article>
                </div>
            </div>
        </main>
    );
}
