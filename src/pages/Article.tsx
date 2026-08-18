import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import Header from "../components/layout/Header";
import ScrollReveal from "../components/motion/ScrollReveal";
import { getBlogPostBySlug } from "../services/blog";
import ArticleMark from "../components/journal/ArticleMark";

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
                            <div className="grid items-start gap-10 md:grid-cols-[1fr_auto]">
                                <div>
                                    <p
                                        className="mb-5 text-xs uppercase tracking-[0.35em]"
                                        style={{
                                            color: "var(--accent)",
                                        }}
                                    >
                                        {post.category || "journal"}
                                    </p>

                                    <h1 className="max-w-3xl text-4xl font-light leading-tight md:text-5xl">
                                        {post.title}
                                    </h1>
                                </div>

                                <div className="hidden md:block">
                                    <ArticleMark />
                                </div>
                            </div>

                            <p
                                className="mt-7 max-w-2xl text-base italic leading-7 md:text-lg md:leading-8"
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
                    
                    <div className="max-w-2xl py-16">
                        <div className="space-y-7">
                            {post.content
                                .split("\n\n")
                                .map((paragraph, index) => {
                                    const isSectionHeading =
                                        paragraph ===
                                            "Space for breath" ||
                                        paragraph ===
                                            "Letting go";

                                    if (isSectionHeading) {
                                        return (
                                            <h2
                                                key={index}
                                                className="pt-8 text-lg font-light tracking-wide md:text-xl"
                                                style={{
                                                    color:
                                                        "var(--page-text)",
                                                }}
                                            >
                                                {paragraph}
                                            </h2>
                                        );
                                    }

                                    return (
                                        <p
                                            key={index}
                                            className="whitespace-pre-line text-base leading-8 md:text-lg md:leading-9"
                                            style={{
                                                color:
                                                    "var(--muted-text)",
                                            }}
                                        >
                                            {paragraph}
                                        </p>
                                    );
                                })
                            }
                        </div>
                    </div>
                </article>
            </main>
        </>
    );
}

export default Article;