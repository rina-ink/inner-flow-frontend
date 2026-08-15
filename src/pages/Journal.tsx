import { useEffect, useState } from "react";
import { Link } from "react-router";

import Header from "../components/layout/Header";
import ScrollReveal from "../components/motion/ScrollReveal";
import { getBlogPosts } from "../services/blog";

import type { BlogPostSummary } from "../types/blog";

function Journal() {
    const [posts, setPosts] =
        useState<BlogPostSummary[]>([]);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data =
                    await getBlogPosts();

                setPosts(data);
            } catch {
                setError(
                    "Could not load journal articles.",
                );
            } finally {
                setIsLoading(false);
            }
        };

        loadPosts();
    }, []);

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
                <div className="mx-auto max-w-6xl">
                    <ScrollReveal>
                        <div className="mb-24 max-w-3xl">
                            <p
                                className="mb-4 text-xs uppercase tracking-[0.35em]"
                                style={{
                                    color:
                                        "var(--accent)",
                                }}
                            >
                                journal
                            </p>

                            <h1 className="text-3xl font-light leading-tight md:text-5xl">
                                Notes on body,
                                <br />
                                touch and movement.
                            </h1>
                        </div>
                    </ScrollReveal>

                    {isLoading && (
                        <p
                            style={{
                                color:
                                    "var(--muted-text)",
                            }}
                        >
                            Loading journal...
                        </p>
                    )}

                    {error && (
                        <p
                            style={{
                                color:
                                    "var(--accent)",
                            }}
                        >
                            {error}
                        </p>
                    )}

                    {!isLoading &&
                        !error && (
                            <div className="space-y-20">
                                {posts.map(
                                    (
                                        post,
                                        index,
                                    ) => (
                                        <ScrollReveal
                                            key={
                                                post._id
                                            }
                                            delay={
                                                index *
                                                100
                                            }
                                        >
                                            <article className="relative grid gap-8 border-b border-current/10 pb-16 md:grid-cols-[0.35fr_1fr] md:gap-16">
                                                <div>
                                                    <p
                                                        className="text-xs uppercase tracking-[0.3em]"
                                                        style={{
                                                            color:
                                                                "var(--accent)",
                                                        }}
                                                    >
                                                        {String(
                                                            index +
                                                                1,
                                                        ).padStart(
                                                            2,
                                                            "0",
                                                        )}
                                                    </p>
                                                </div>

                                                <div className="max-w-3xl">
                                                    <h2 className="text-3xl font-light leading-tight md:text-4xl">
                                                        {
                                                            post.title
                                                        }
                                                    </h2>

                                                    <p
                                                        className="mt-5 max-w-2xl leading-7"
                                                        style={{
                                                            color:
                                                                "var(--muted-text)",
                                                        }}
                                                    >
                                                        {
                                                            post.excerpt
                                                        }
                                                    </p>

                                                    <div className="mt-7 flex flex-wrap items-center gap-4 text-xs tracking-wide">
                                                        {post.category && (
                                                            <span>
                                                                {
                                                                    post.category
                                                                }
                                                            </span>
                                                        )}

                                                        {post.publishedAt && (
                                                            <span
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
                                                            </span>
                                                        )}
                                                    </div>

                                                    <Link
                                                        to={`/journal/${post.slug}`}
                                                        className="mt-8 inline-block text-sm tracking-wide transition-opacity duration-300 hover:opacity-50"
                                                    >
                                                        read →
                                                    </Link>
                                                </div>
                                            </article>
                                        </ScrollReveal>
                                    ),
                                )}
                            </div>
                        )}
                </div>
            </main>
        </>
    );
}

export default Journal;