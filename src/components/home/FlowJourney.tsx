import ScrollReveal from "../motion/ScrollReveal";

const steps = [
    {
        title: "Attention",
        description: "Arrive. Notice.",
    },
    {
        title: "Connection",
        description: "Meet. Unwind.",
    },
    {
        title: "Release",
        description: "Tension softens. Energy flows.",
    },
    {
        title: "Flow",
        description: "Body & mind move as one.",
    },
    {
        title: "Return",
        description: "Leave lighter. Carry on.",
    },
];

function FlowJourney() {
    return (
        <section className="relative px-6 py-28 md:px-16">
            <div className="mx-auto max-w-6xl">
                <ScrollReveal>
                    <p
                        className="mb-12 text-xs uppercase tracking-[0.35em]"
                        style={{
                            color: "var(--accent)",
                        }}
                    >
                        the rhythm of a session
                    </p>
                </ScrollReveal>

                <div className="relative">
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 1200 220"
                        className="journey-line absolute left-0 top-22 hidden w-full md:block"
                        fill="none"
                    >
                        <path
                            d="
                                M 20 120
                                C 130 60, 220 170, 330 115
                                C 440 60, 520 160, 620 105
                                C 720 45, 820 165, 930 110
                                C 1030 60, 1110 80, 1180 120
                            "
                        />
                    </svg>

                    <div className="relative grid gap-16 md:grid-cols-5 md:gap-6">
                        {steps.map((step, index) => (
                            <ScrollReveal
                                key={step.title}
                                delay={index * 120}
                                className="relative"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="journey-mark mb-6" />

                                    <span className="text-lg font-light tracking-wide">
                                        {step.title}
                                    </span>

                                    <p
                                        className="mt-2 max-w-36 text-xs leading-5 opacity-55"
                                        style={{
                                            color:
                                                "var(--muted-text)",
                                        }}
                                    >
                                        {step.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FlowJourney;