import BlogDetails from "@/components/blog/BlogDetails";

export async function generateMetadata({ params }) {
    try {
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/blog?id=${params.id}`, { cache: 'no-store' });
        const data = await response.json();

        if (!data.blog) return { title: "Blog Not Found | Blogify" };

        return {
            title: `${data.blog.title} | Blogify`,
            description: data.blog.description.substring(0, 160).replace(/<[^>]*>/g, ''),
            openGraph: {
                title: data.blog.title,
                description: data.blog.description.substring(0, 160).replace(/<[^>]*>/g, ''),
                images: [data.blog.image],
            },
        };
    } catch (error) {
        return { title: "Blog Post | Blogify" };
    }
}

export default function Page({ params }) {
    return <BlogDetails id={params.id} />;
}