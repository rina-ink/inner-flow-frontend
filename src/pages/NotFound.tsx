import { Link } from "react-router";

import Header from "../components/layout/Header";
import ScrollReveal from "../components/motion/ScrollReveal";

function NotFound() {
    return (
        <>
            <Header />

            <main
                className="flex min-h-screen items-center px-6 py-32 md:px-16"
                style={{
                    background: "var(--page-bg)",
                    color: "var(--page-text)",
                }}
            >
                <div className="mx-auto w-full max-w-6xl">
                    <ScrollReveal>
                        <div className="max-w-2xl">
                            <p
                                className="mb-5 text-xs uppercase tracking-[0.35em]"
                                style={{
                                    color: "var(--accent)",
                                }}
                            >
                                404
                            </p>

                            <h1 className="text-3xl font-light leading-tight md:text-5xl">
                                This path doesn&apos;t
                                lead anywhere.
                            </h1>

                            <p
                                className="mt-6 max-w-md leading-7"
                                style={{
                                    color: "var(--muted-text)",
                                }}
                            >
                                You can return to the
                                beginning and find your
                                way from there.
                            </p>

                            <Link
                                to="/"
                                className="mt-10 inline-block border-b border-current/30 pb-1 text-sm tracking-wide transition-opacity duration-300 hover:opacity-50"
                            >
                                ← return home
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </main>
        </>
    );
}

export default NotFound;