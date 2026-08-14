import Header from "../components/layout/Header";
import BreathingShape from "../components/motion/BreathingShape";
import FloatingLayer from "../components/motion/FloatingLayer";
import ScrollFlowLine from "../components/motion/ScrollFlowLine";
import ScrollReveal from "../components/motion/ScrollReveal";
import FlowJourney from "../components/home/FlowJourney";

function Home() {
    return (
        <>
            <Header />

            <main
                className="relative min-h-screen overflow-x-hidden"
                style={{
                    background: "var(--page-bg)",
                    color: "var(--page-text)",
                }}
            >
                {/* -------------------------
                    HERO
                ------------------------- */}

                <section className="relative flex min-h-screen items-center justify-center px-6">
                    <BreathingShape className="absolute" />

                    <FloatingLayer className="absolute left-[12%] top-[28%]" />

                    <ScrollFlowLine className="pointer-events-none absolute left-1/2 top-[62%] z-20 -translate-x-1/2" />

                    <div className="relative z-30 text-center">
                        <p
                            className="mb-4 text-xs uppercase tracking-[0.35em]"
                            style={{
                                color: "var(--accent)",
                            }}
                        >
                            massage · touch · rest · movement
                        </p>

                        <h1 className="text-6xl font-light tracking-wide md:text-8xl">
                            inner flow
                        </h1>

                        <p
                            className="mt-6 text-xl leading-relaxed"
                            style={{
                                color: "var(--muted-text)",
                            }}
                        >
                            Care for body.
                            <br />
                            Space for mind.
                        </p>
                    </div>
                </section>

                {/* -------------------------
                    SECOND SECTION
                ------------------------- */}

                <section className="relative flex min-h-[80vh] items-center px-6 py-24 md:px-16">
                    <div className="mx-auto grid w-full max-w-6xl gap-16 md:grid-cols-2">
                        <ScrollReveal>
                            <div>
                                <p
                                    className="mb-4 text-xs uppercase tracking-[0.3em]"
                                    style={{
                                        color: "var(--accent)",
                                    }}
                                >
                                    inner flow
                                </p>

                                <h2 className="max-w-lg text-4xl font-light leading-tight md:text-6xl">
                                    Attention.
                                    <br />
                                    Connection.
                                    <br />
                                    Release.
                                </h2>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal
                            delay={180}
                            className="flex items-center"
                        >
                            <p
                                className="max-w-md text-lg leading-8"
                                style={{
                                    color: "var(--muted-text)",
                                }}
                            >
                                A space for slowing down, noticing,
                                and reconnecting with the body through
                                touch, movement, rest, and awareness.
                            </p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* -------------------------
                    FLOW JOURNEY
                ------------------------- */}

                <FlowJourney />
                
            </main>
        </>
    );
}

export default Home;