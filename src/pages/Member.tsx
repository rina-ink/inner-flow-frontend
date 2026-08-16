import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Header from "../components/layout/Header";
import ScrollReveal from "../components/motion/ScrollReveal";
import {
    getMe,
    logout,
} from "../services/auth";

import type { User } from "../types/auth";

function Member() {
    const navigate = useNavigate();

    const [user, setUser] =
        useState<User | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [isLoggingOut, setIsLoggingOut] =
        useState(false);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getMe();

                setUser(data);
            } catch {
                navigate("/login");
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, [navigate]);

    const handleLogout = async () => {
        setError("");
        setIsLoggingOut(true);

        try {
            await logout();

            navigate("/login");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not log out.",
            );
        } finally {
            setIsLoggingOut(false);
        }
    };

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
                            Loading your space...
                        </p>
                    </div>
                </main>
            </>
        );
    }

    if (!user) {
        return null;
    }

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
                <div className="mx-auto max-w-5xl">
                    <ScrollReveal>
                        <div className="mb-20 max-w-2xl">
                            <p
                                className="mb-4 text-xs uppercase tracking-[0.35em]"
                                style={{
                                    color:
                                        "var(--accent)",
                                }}
                            >
                                member
                            </p>

                            <h1 className="text-3xl font-light leading-tight md:text-5xl">
                                Welcome, {user.firstName}.
                            </h1>

                            <p
                                className="mt-5 leading-7"
                                style={{
                                    color:
                                        "var(--muted-text)",
                                }}
                            >
                                Your bookings and preferences
                                will live here.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid gap-12 md:grid-cols-2">
                        <ScrollReveal delay={100}>
                            <section className="border-b border-current/10 pb-10">
                                <p
                                    className="mb-5 text-xs uppercase tracking-[0.3em]"
                                    style={{
                                        color:
                                            "var(--accent)",
                                    }}
                                >
                                    profile
                                </p>

                                <p className="text-lg">
                                    {user.firstName}{" "}
                                    {user.lastName}
                                </p>

                                <p
                                    className="mt-2"
                                    style={{
                                        color:
                                            "var(--muted-text)",
                                    }}
                                >
                                    {user.email}
                                </p>
                            </section>
                        </ScrollReveal>

                        <ScrollReveal delay={180}>
                            <section className="border-b border-current/10 pb-10">
                                <p
                                    className="mb-5 text-xs uppercase tracking-[0.3em]"
                                    style={{
                                        color:
                                            "var(--accent)",
                                    }}
                                >
                                    bookings
                                </p>

                                <p
                                    style={{
                                        color:
                                            "var(--muted-text)",
                                    }}
                                >
                                    Your upcoming and previous
                                    bookings will appear here.
                                </p>
                            </section>
                        </ScrollReveal>
                    </div>

                    {error && (
                        <p
                            className="mt-10 text-sm"
                            style={{
                                color:
                                    "var(--accent)",
                            }}
                        >
                            {error}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="mt-16 rounded-full border border-current/30 px-8 py-3 text-sm tracking-wide transition-opacity duration-300 hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {isLoggingOut
                            ? "Signing out..."
                            : "Sign out"}
                    </button>
                </div>
            </main>
        </>
    );
}

export default Member;