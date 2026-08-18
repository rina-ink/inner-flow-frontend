import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Header from "../components/layout/Header";
import ScrollReveal from "../components/motion/ScrollReveal";
import MusicPreferenceSelector from "../components/preferences/MusicPreferenceSelector";

import {
    getMe,
    logout,
} from "../services/auth";

import {
    cancelBooking,
    getMyBookings,
} from "../services/bookings";

import {
    getMyMemberProfile,
    updateMyPreferences,
} from "../services/member";

import type { User } from "../types/auth";
import type { MemberBooking } from "../types/booking";
import type { MemberPreferences } from "../types/member";

function Member() {
    const navigate = useNavigate();

    const [user, setUser] =
        useState<User | null>(null);

    const [bookings, setBookings] =
        useState<MemberBooking[]>([]);

    const [preferences, setPreferences] =
        useState<MemberPreferences>({
            musicPreference: null,
            quieterSession: false,
        });

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [isLoggingOut, setIsLoggingOut] =
        useState(false);

    const [
        cancellingBookingId,
        setCancellingBookingId,
    ] = useState<string | null>(null);

    const [
        isSavingPreferences,
        setIsSavingPreferences,
    ] = useState(false);

    const [
        preferencesMessage,
        setPreferencesMessage,
    ] = useState("");

    useEffect(() => {
        const loadMemberData = async () => {
            try {
                const [
                    userData,
                    bookingData,
                    memberProfile,
                ] = await Promise.all([
                    getMe(),
                    getMyBookings(),
                    getMyMemberProfile(),
                ]);

                setUser(userData);
                setBookings(bookingData);

                setPreferences(
                    memberProfile.preferences,
                );
            } catch {
                navigate("/login");
            } finally {
                setIsLoading(false);
            }
        };

        loadMemberData();
    }, [navigate]);

    const handleCancelBooking = async (
        bookingId: string,
    ) => {
        setError("");
        setCancellingBookingId(bookingId);

        try {
            const updatedBooking =
                await cancelBooking(bookingId);

            setBookings((current) =>
                current.map((booking) =>
                    booking._id ===
                    updatedBooking._id
                        ? updatedBooking
                        : booking,
                ),
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not cancel booking.",
            );
        } finally {
            setCancellingBookingId(null);
        }
    };

    const handleSavePreferences = async () => {
        setError("");
        setPreferencesMessage("");
        setIsSavingPreferences(true);

        try {
            const result =
                await updateMyPreferences(
                    preferences,
                );

            setPreferences(
                result.preferences,
            );

            setPreferencesMessage(
                "Preferences saved.",
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not save preferences.",
            );
        } finally {
            setIsSavingPreferences(false);
        }
    };

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
                                Welcome,{" "}
                                {user.firstName}.
                            </h1>

                            <p
                                className="mt-5 leading-7"
                                style={{
                                    color:
                                        "var(--muted-text)",
                                }}
                            >
                                Your bookings and
                                preferences will live
                                here.
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

                                {bookings.length === 0 ? (
                                    <p
                                        style={{
                                            color:
                                                "var(--muted-text)",
                                        }}
                                    >
                                        You don't have any
                                        bookings yet.
                                    </p>
                                ) : (
                                    <div className="space-y-8">
                                        {bookings.map(
                                            (booking) => (
                                                <article
                                                    key={
                                                        booking._id
                                                    }
                                                    className="border-b border-current/10 pb-6 last:border-b-0"
                                                >
                                                    <p className="text-lg">
                                                        {
                                                            booking
                                                                .massageId
                                                                .name
                                                        }
                                                    </p>

                                                    <p
                                                        className="mt-2 text-sm"
                                                        style={{
                                                            color:
                                                                "var(--muted-text)",
                                                        }}
                                                    >
                                                        {new Date(
                                                            `${booking.date}T00:00:00`,
                                                        ).toLocaleDateString(
                                                            "en-GB",
                                                            {
                                                                day: "2-digit",
                                                                month: "long",
                                                                year: "numeric",
                                                            },
                                                        )}

                                                        {" · "}

                                                        {
                                                            booking.startTime
                                                        }

                                                        {" · "}

                                                        {
                                                            booking.duration
                                                        }{" "}
                                                        min
                                                    </p>

                                                    <p
                                                        className="mt-2 text-xs uppercase tracking-[0.2em]"
                                                        style={{
                                                            color:
                                                                "var(--accent)",
                                                        }}
                                                    >
                                                        {
                                                            booking.status
                                                        }
                                                    </p>

                                                    {booking.status ===
                                                        "confirmed" && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleCancelBooking(
                                                                    booking._id,
                                                                )
                                                            }
                                                            disabled={
                                                                cancellingBookingId ===
                                                                booking._id
                                                            }
                                                            className="mt-5 text-sm tracking-wide transition-opacity duration-300 hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-40"
                                                        >
                                                            {cancellingBookingId ===
                                                            booking._id
                                                                ? "Cancelling..."
                                                                : "Cancel booking"}
                                                        </button>
                                                    )}
                                                </article>
                                            ),
                                        )}
                                    </div>
                                )}
                            </section>
                        </ScrollReveal>
                    </div>

                    {/* -------------------------
                        PREFERENCES
                    ------------------------- */}

                    <ScrollReveal delay={220}>
                        <section className="mt-20 border-b border-current/10 pb-12">
                            <p
                                className="mb-8 text-xs uppercase tracking-[0.3em]"
                                style={{
                                    color:
                                        "var(--accent)",
                                }}
                            >
                                preferences
                            </p>

                            <div className="space-y-10">
                                <MusicPreferenceSelector
                                    value={
                                        preferences.musicPreference
                                    }
                                    onChange={(value) =>
                                        setPreferences(
                                            (current) => ({
                                                ...current,
                                                musicPreference:
                                                    value,
                                            }),
                                        )
                                    }
                                />

                                <label className="flex cursor-pointer items-start gap-4">
                                    <input
                                        type="checkbox"
                                        checked={
                                            preferences.quieterSession
                                        }
                                        onChange={(event) =>
                                            setPreferences(
                                                (current) => ({
                                                    ...current,
                                                    quieterSession:
                                                        event.target
                                                            .checked,
                                                }),
                                            )
                                        }
                                        className="mt-1"
                                    />

                                    <span>
                                        <span className="block text-sm tracking-wide">
                                            I prefer a quieter
                                            session
                                        </span>

                                        <span
                                            className="mt-1 block text-sm leading-6"
                                            style={{
                                                color:
                                                    "var(--muted-text)",
                                            }}
                                        >
                                            Less conversation,
                                            more space to rest.
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </section>
                    </ScrollReveal>

                    {preferencesMessage && (
                        <p
                            className="mt-10 text-sm"
                            style={{
                                color:
                                    "var(--accent)",
                            }}
                        >
                            {preferencesMessage}
                        </p>
                    )}

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

                    <div className="mt-12 flex flex-wrap gap-4">
                        <button
                            type="button"
                            onClick={
                                handleSavePreferences
                            }
                            disabled={
                                isSavingPreferences
                            }
                            className="rounded-full border border-current/30 px-8 py-3 text-sm tracking-wide transition-opacity duration-300 hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {isSavingPreferences
                                ? "Saving..."
                                : "Save preferences"}
                        </button>

                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="rounded-full border border-current/30 px-8 py-3 text-sm tracking-wide transition-opacity duration-300 hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {isLoggingOut
                                ? "Signing out..."
                                : "Sign out"}
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Member;