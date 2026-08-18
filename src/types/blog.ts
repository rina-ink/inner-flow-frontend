export type BlogPostSummary = {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    tags: string[];
    illustrationKey?: string;
    publishedAt: string | null;
};

export type BlogPost = BlogPostSummary & {
    content: string;
    status: "draft" | "published";
};