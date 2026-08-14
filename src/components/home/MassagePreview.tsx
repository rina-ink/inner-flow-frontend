import { useEffect, useState } from "react";
import { Link } from "react-router";

import { getMassages } from "../../services/massages";
import type { MassageSummary } from "../../types/massage";
import ScrollReveal from "../motion/ScrollReveal";

function MassagePreview() {
    const [massages, setMassages] = useState<MassageSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadMassages = async () => {
            try {
                const data = await getMassages();
                setMassages(data);
            } catch {
                setError("Could not load massages.");
            } finally {
                setIsLoading(false);
            }
        };
        
        loadMassages();
    }, []);
    
    if (isLoading) {
        return (
            <section className="px-6 py-24 md:px-16">
                <p style={{ color: "var(--muted-text)" }}>
                    Loading massages...
                </p>
            </section>
        );
    }
    
    if (error) {
        return (
            <section className="px-6 py-24 md:px-16">
                <p style={{ color: "var(--muted-text)" }}>
                    {error}
                </p>
            </section>
        );
    }

    return (
        <section className="relative px-6 py-28 md:px-16">
            <div className="mx-auto max-w-6xl">
                <ScrollReveal>
                    <div className="mb-16 max-w-2xl">
                        <p
                            className="mb-4 text-xs uppercase tracking-[0.35em]"
                            style={{ color: "var(--accent)" }}
                        >
                            massage
                        </p>

                        <h2 className="text-4xl font-light leading-tight md:text-6xl">
                            Different ways
                        <br />
                        into stillness.
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid gap-12 md:grid-cols-2">
                    {massages.map((massage, index) => (
                        <ScrollReveal
                            key={massage._id}
                            delay={index * 120}
                        >
                            <article className="group relative min-h-[22rem] overflow-hidden border border-current/10 p-8">
                                <div className="mb-10 flex min-h-36 items-center justify-center">
                                    <div
                                        className={`massage-illustration massage-illustration-${massage.illustrationKey}`}
                                        aria-hidden="true"
                                    />
                                </div>

                                <p
                                    className="mb-3 text-xs uppercase tracking-[0.3em]"
                                    style={{ color: "var(--accent)" }}
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </p>

                                <h3 className="text-3xl font-light">
                                    {massage.name}
                                </h3>

                                <p
                                    className="mt-4 max-w-md leading-7"
                                    style={{ color: "var(--muted-text)" }}
                                >
                                    {massage.shortDescription}
                                </p>

                                <Link
                                    to={`/massages/${massage.slug}`}
                                    className="mt-8 inline-block text-sm tracking-wide"
                                >
                                    explore →
                                </Link>
                            </article>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default MassagePreview;