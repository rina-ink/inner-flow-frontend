import { useState } from "react";
import { Link, useNavigate } from "react-router";

import Header from "../components/layout/Header";
import ScrollReveal from "../components/motion/ScrollReveal";
import { register } from "../services/auth";

function Register() {
    const navigate = useNavigate();

    const [firstName, setFirstName] =
        useState("");

    const [lastName, setLastName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        setError("");
        setIsSubmitting(true);

        try {
            await register({
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            });

            navigate("/member");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not create account.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

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
                <div className="mx-auto max-w-xl">
                    <ScrollReveal>
                        <div className="mb-16">
                            <p
                                className="mb-4 text-xs uppercase tracking-[0.35em]"
                                style={{
                                    color:
                                        "var(--accent)",
                                }}
                            >
                                account
                            </p>

                            <h1 className="text-3xl font-light leading-tight md:text-5xl">
                                Create your space.
                            </h1>

                            <p
                                className="mt-5 max-w-md leading-7"
                                style={{
                                    color:
                                        "var(--muted-text)",
                                }}
                            >
                                Keep track of your
                                bookings and preferences.
                            </p>
                        </div>
                    </ScrollReveal>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-10"
                    >
                        <div className="grid gap-8 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="mb-3 block text-sm tracking-wide"
                                >
                                    First name
                                </label>

                                <input
                                    id="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={(event) =>
                                        setFirstName(
                                            event.target.value,
                                        )
                                    }
                                    required
                                    autoComplete="given-name"
                                    className="w-full border-b border-current/20 bg-transparent py-3 outline-none"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="mb-3 block text-sm tracking-wide"
                                >
                                    Last name
                                </label>

                                <input
                                    id="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={(event) =>
                                        setLastName(
                                            event.target.value,
                                        )
                                    }
                                    required
                                    autoComplete="family-name"
                                    className="w-full border-b border-current/20 bg-transparent py-3 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-3 block text-sm tracking-wide"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target.value,
                                    )
                                }
                                required
                                autoComplete="email"
                                className="w-full border-b border-current/20 bg-transparent py-3 outline-none"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-3 block text-sm tracking-wide"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value,
                                    )
                                }
                                required
                                autoComplete="new-password"
                                className="w-full border-b border-current/20 bg-transparent py-3 outline-none"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-3 block text-sm tracking-wide"
                            >
                                Confirm password
                            </label>

                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(
                                        event.target.value,
                                    )
                                }
                                required
                                autoComplete="new-password"
                                className="w-full border-b border-current/20 bg-transparent py-3 outline-none"
                            />
                        </div>

                        <p
                            className="text-sm leading-6"
                            style={{
                                color:
                                    "var(--muted-text)",
                            }}
                        >
                            Use at least 12 characters.
                        </p>

                        {error && (
                            <p
                                className="text-sm"
                                style={{
                                    color:
                                        "var(--accent)",
                                }}
                            >
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-full border border-current/30 px-8 py-3 text-sm tracking-wide transition-opacity duration-300 hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {isSubmitting
                                ? "Creating account..."
                                : "Create account"}
                        </button>
                    </form>

                    <p
                        className="mt-12 text-sm"
                        style={{
                            color:
                                "var(--muted-text)",
                        }}
                    >
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="transition-opacity duration-300 hover:opacity-50"
                            style={{
                                color:
                                    "var(--page-text)",
                            }}
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </main>
        </>
    );
}

export default Register;