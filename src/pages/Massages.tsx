import { useEffect, useState } from "react";
import { Link } from "react-router";

import Header from "../components/layout/Header";
import ScrollReveal from "../components/motion/ScrollReveal";

import { getMassages } from "../services/massages";

import type { MassageSummary } from "../types/massage";

function Massages() {
    const [massages, setMassages] =
        useState<MassageSummary[]>([]);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const loadMassages = async () => {
            try {
                const data =
                    await getMassages();

                setMassages(data);
            } catch {
                setError(
                    "Could not load massages.",
                );
            } finally {
                setIsLoading(false);
            }
        };

        loadMassages();
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
                                massage
                            </p>

                            <h1 className="text-3xl font-light leading-tight md:text-5xl">
                                Different ways
                                <br />
                                to meet the body.
                            </h1>

                            <p
                                className="mt-6 max-w-xl leading-7"
                                style={{
                                    color:
                                        "var(--muted-text)",
                                }}
                            >
                                Each session offers a
                                different quality of
                                pressure, pace and
                                attention.
                            </p>
                        </div>
                    </ScrollReveal>

                    {isLoading && (
                        <p
                            style={{
                                color:
                                    "var(--muted-text)",
                            }}
                        >
                            Loading massages...
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
                            <div className="space-y-24">
                                {massages.map(
                                    (
                                        massage,
                                        index,
                                    ) => (
                                        <ScrollReveal
                                            key={
                                                massage._id
                                            }
                                            delay={
                                                index *
                                                100
                                            }
                                        >
                                            <article
                                                className={`
                                                    grid items-center gap-12 border-b
                                                    border-current/10 pb-20
                                                    md:grid-cols-2 md:gap-20
                                                    ${
                                                        index %
                                                            2 !==
                                                        0
                                                            ? "md:[&>*:first-child]:order-2"
                                                            : ""
                                                    }
                                                `}
                                            >
                                                <div className="flex min-h-72 items-center justify-center">
                                                    <div
                                                        className={`massage-illustration massage-illustration-${massage.illustrationKey}`}
                                                        aria-hidden="true"
                                                    />
                                                </div>

                                                <div className="max-w-md">
                                                    <p
                                                        className="mb-4 text-xs uppercase tracking-[0.3em]"
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

                                                    <h2 className="text-3xl font-light leading-tight md:text-4xl">
                                                        {
                                                            massage.name
                                                        }
                                                    </h2>

                                                    <p
                                                        className="mt-5 leading-7"
                                                        style={{
                                                            color:
                                                                "var(--muted-text)",
                                                        }}
                                                    >
                                                        {
                                                            massage.shortDescription
                                                        }
                                                    </p>

                                                    <Link
                                                        to={`/massages/${massage.slug}`}
                                                        className="mt-8 inline-block text-sm tracking-wide transition-opacity duration-300 hover:opacity-50"
                                                    >
                                                        explore →
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

export default Massages;