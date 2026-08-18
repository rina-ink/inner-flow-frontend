import { API_URL } from "./api";

import type {
    BlogPost,
    BlogPostSummary,
} from "../types/blog";

type BlogPostsResponse = {
    results: BlogPostSummary[];
};

export async function getBlogPosts(): Promise<
    BlogPostSummary[]
> {
    const response = await fetch(
        `${API_URL}/api/blog`,
    );

    if (!response.ok) {
        throw new Error(
            "Could not load journal articles.",
        );
    }

    const data =
        (await response.json()) as BlogPostsResponse;

    return data.results;
}

export async function getBlogPostBySlug(
    slug: string,
): Promise<BlogPost> {
    const response = await fetch(
        `${API_URL}/api/blog/${slug}`,
    );

    if (!response.ok) {
        throw new Error(
            "Could not load journal article.",
        );
    }

    return (await response.json()) as BlogPost;
}