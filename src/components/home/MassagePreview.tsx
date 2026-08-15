import { useEffect, useState } from "react";
import { Link } from "react-router";

import { getMassages } from "../../services/massages";
import type { MassageSummary } from "../../types/massage";
import ScrollReveal from "../motion/ScrollReveal";
import MassageFlowBackdrop from "./MassageFlowBackdrop";

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
            <section className="relative overflow-hidden px-6 py-28 md:px-16">
                <MassageFlowBackdrop />

                <p 
                    className="relative z-10"
                    style={{ color: "var(--muted-text)" }}
                >
                    Loading massages...
                </p>
            </section>
        );
    }
    
    if (error) {
        return (
            <section className="relative overflow-hidden px-6 py-28 md:px-16">

                <p
                    className="relative z-10"
                    style={{ color: "var(--muted-text)" }}
                >
                    {error}
                </p>
            </section>
        );
    }

    return (
        <section className="relative overflow-hidden px-6 py-28 md:px-16">
            <MassageFlowBackdrop />

            <div className="relative z-10 mx-auto max-w-6xl">
                <ScrollReveal>
                    <div className="mb-16 max-w-2xl">
                        <p
                            className="mb-4 text-xs uppercase tracking-[0.35em]"
                            style={{ color: "var(--accent)" }}
                        >
                            massage
                        </p>

                        <h2 className="text-3xl font-light leading-tight md:text-5xl">
                            Different ways
                            <br />
                            into stillness.
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="space-y-12 md:space-y-20">
                    {massages.map((massage, index) => (
                        <ScrollReveal
                            key={massage._id}
                            delay={index * 120}
                        >
                            <article
                                className={`
                                    group relative grid min-h-88 items-center gap-8
                                    py-12 md:grid-cols-2 md:gap-14
                                    ${index % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""}
                                `}
                            >
                                {/* -------------------------
                                    ILLUSTRATION
                                ------------------------- */}

                                <div className="relative flex min-h-56 items-center justify-center">
                                    <div
                                        className={`massage-illustration massage-illustration-${massage.illustrationKey}`}
                                        aria-hidden="true"
                                    />
                                </div>

                                {/* -------------------------
                                    CONTENT
                                ------------------------- */}

                                <div className="max-w-md">
                                    <p
                                        className="mb-4 text-xs uppercase tracking-[0.3em]"
                                        style={{ color: "var(--accent)" }}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </p>

                                    <h3 className="text-3xl font-light md:text-4xl">
                                        {massage.name}
                                    </h3>

                                    <p
                                        className="mt-5 leading-7"
                                        style={{ color: "var(--muted-text)" }}
                                    >
                                        {massage.shortDescription}
                                    </p>

                                    <Link
                                        to={`/massages/${massage.slug}`}
                                        className="mt-8 inline-block text-sm tracking-wide transition-opacity duration-300 hover:opacity-50"
                                    >
                                        explore →
                                    </Link>
                                </div>
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-x-0 bottom-0 h-px opacity-10"
                                    style={{ background: "var(--page-text)" }}
                                />
                            </article>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default MassagePreview;