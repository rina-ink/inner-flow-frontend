import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import Header from "../components/layout/Header";
import ScrollReveal from "../components/motion/ScrollReveal";
import { getBlogPostBySlug } from "../services/blog";

import type { BlogPost } from "../types/blog";

function Article() {
    const { slug } = useParams();

    const [post, setPost] =
        useState<BlogPost | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const loadPost = async () => {
            if (!slug) {
                setError(
                    "Journal article not found.",
                );
                setIsLoading(false);
                return;
            }

            try {
                const data =
                    await getBlogPostBySlug(
                        slug,
                    );

                setPost(data);
            } catch {
                setError(
                    "Could not load journal article.",
                );
            } finally {
                setIsLoading(false);
            }
        };

        loadPost();
    }, [slug]);

    if (isLoading) {
        return (
            <>
                <Header />

                <main
                    className="min-h-screen px-6 pb-28 pt-36 md:px-16"
                    style={{
                        background:
                            "var(--page-bg)",
                        color:
                            "var(--page-text)",
                    }}
                >
                    <div className="mx-auto max-w-4xl">
                        <p
                            style={{
                                color:
                                    "var(--muted-text)",
                            }}
                        >
                            Loading article...
                        </p>
                    </div>
                </main>
            </>
        );
    }

    if (error || !post) {
        return (
            <>
                <Header />

                <main
                    className="min-h-screen px-6 pb-28 pt-36 md:px-16"
                    style={{
                        background:
                            "var(--page-bg)",
                        color:
                            "var(--page-text)",
                    }}
                >
                    <div className="mx-auto max-w-4xl">
                        <p
                            style={{
                                color:
                                    "var(--accent)",
                            }}
                        >
                            {error ||
                                "Journal article not found."}
                        </p>

                        <Link
                            to="/journal"
                            className="mt-8 inline-block text-sm tracking-wide"
                        >
                            ← journal
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Header />

            <main
                className="min-h-screen px-6 pb-32 pt-36 md:px-16"
                style={{
                    background:
                        "var(--page-bg)",
                    color:
                        "var(--page-text)",
                }}
            >
                <article className="mx-auto max-w-4xl">
                    <ScrollReveal>
                        <Link
                            to="/journal"
                            className="text-sm tracking-wide transition-opacity duration-300 hover:opacity-50"
                            style={{
                                color:
                                    "var(--muted-text)",
                            }}
                        >
                            ← journal
                        </Link>
                    </ScrollReveal>

                    <ScrollReveal delay={100}>
                        <header className="mt-16 border-b border-current/10 pb-16">
                            <p
                                className="mb-5 text-xs uppercase tracking-[0.35em]"
                                style={{
                                    color:
                                        "var(--accent)",
                                }}
                            >
                                {post.category ||
                                    "journal"}
                            </p>

                            <h1 className="max-w-3xl text-4xl font-light leading-tight md:text-6xl">
                                {post.title}
                            </h1>

                            <p
                                className="mt-7 max-w-2xl text-lg leading-8"
                                style={{
                                    color:
                                        "var(--muted-text)",
                                }}
                            >
                                {post.excerpt}
                            </p>

                            {post.publishedAt && (
                                <p
                                    className="mt-8 text-xs tracking-wide"
                                    style={{
                                        color:
                                            "var(--muted-text)",
                                    }}
                                >
                                    {new Date(
                                        post.publishedAt,
                                    ).toLocaleDateString(
                                        "en-GB",
                                        {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        },
                                    )}
                                </p>
                            )}
                        </header>
                    </ScrollReveal>

                    <ScrollReveal delay={180}>
                        <div className="max-w-2xl py-16">
                            <p
                                className="whitespace-pre-line text-lg leading-9"
                                style={{
                                    color:
                                        "var(--muted-text)",
                                }}
                            >
                                {post.content}
                            </p>
                        </div>
                    </ScrollReveal>
                </article>
            </main>
        </>
    );
}

export default Article;