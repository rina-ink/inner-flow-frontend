import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { API_URL } from "../services/api";

type Massage = {
    _id: string;
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    duration: number;
    price: number;
    illustrationKey: string;
};

function MassageDetails() {
    const { slug } = useParams();

    const [massage, setMassage] =
        useState<Massage | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState("");
        
    useEffect(() => {
        const loadMassage = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/massages/${slug}`,
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to load massage",
                    );
                }

                const data =
                    (await response.json()) as Massage;

                setMassage(data);
            } catch {
                setError(
                    "Could not load this massage.",
                );
            } finally {
                setIsLoading(false);
            }
        };

        if (slug) {
            loadMassage();
        }
    }, [slug]);

    if (isLoading) {
        return (
            <main className="min-h-screen px-6 py-32 md:px-16">
                Loading...
            </main>
        );
    }

    if (error || !massage) {
        return (
            <main className="min-h-screen px-6 py-32 md:px-16">
                {error || "Massage not found."}
            </main>
        );
    }

    return (
        <main
            className="relative min-h-screen overflow-hidden px-6 py-32 md:px-16"
            style={{
                background: "var(--page-bg)",
                color: "var(--page-text)",
            }}
        >
            <div className="mx-auto max-w-6xl">
                <Link
                    to="/massages"
                    className="text-sm tracking-wide"
                    style={{
                        color: "var(--muted-text)",
                    }}
                >
                    ← massages
                </Link>

                <div className="mt-20 grid gap-16 md:grid-cols-2">
                    {/* VISUAL */}

                    <div className="flex min-h-112 items-center justify-center">
                        <div
                            className={`massage-illustration massage-illustration-${massage.illustrationKey}`}
                            aria-hidden="true"
                        />
                    </div>

                    {/* CONTENT */}

                    <div className="flex flex-col justify-center">
                        <p
                            className="mb-5 text-xs uppercase tracking-[0.35em]"
                            style={{
                                color: "var(--accent)",
                            }}
                        >
                            massage
                        </p>

                        <h1 className="text-5xl font-light leading-tight md:text-7xl">
                            {massage.name}
                        </h1>

                        <p
                            className="mt-8 max-w-lg text-lg leading-8"
                            style={{
                                color: "var(--muted-text)",
                            }}
                        >
                            {massage.description}
                        </p>

                        <Link
                            to={`/booking?massage=${massage._id}`}
                            className="mt-12 w-fit border border-current px-7 py-3 text-sm transition-opacity hover:opacity-60"
                        >
                            Book this session
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MassageDetails;