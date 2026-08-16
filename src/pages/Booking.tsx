import { useEffect, useMemo, useState } from "react";

import Header from "../components/layout/Header";
import ScrollReveal from "../components/motion/ScrollReveal";
import MusicPreferenceSelector from "../components/preferences/MusicPreferenceSelector";

import {
    getMassageBySlug,
    getMassages,
} from "../services/massages";
import {
    getAvailabilityByDate,
    getAvailableSlots,
} from "../services/availability";
import { createBooking } from "../services/bookings";
import { getMyMemberProfile } from "../services/member";

import type {
    MassageDetails,
    MassageSummary,
} from "../types/massage";


function Booking() {
    const [massages, setMassages] =
        useState<MassageSummary[]>([]);

    const [
        selectedMassageDetails,
        setSelectedMassageDetails,
    ] = useState<MassageDetails | null>(null);

    const [massageId, setMassageId] =
        useState("");

    const [duration, setDuration] =
        useState<number | null>(null);

    const [date, setDate] =
        useState("");

    const [startTime, setStartTime] =
        useState("");

    const [firstName, setFirstName] =
        useState("");

    const [lastName, setLastName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [phone, setPhone] =
        useState("");

    const [
        musicPreference,
        setMusicPreference,
    ] = useState("");

    const [notes, setNotes] =
        useState("");

    const [
        availableStart,
        setAvailableStart,
    ] = useState("");

    const [
        availableEnd,
        setAvailableEnd,
    ] = useState("");

    const [
        isAvailable,
        setIsAvailable,
    ] = useState<boolean | null>(null);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    // ==============================
    // LOAD MEMBER PREFILL
    // ==============================

    useEffect(() => {
        const loadMemberPrefill = async () => {
            try {
                const member =
                    await getMyMemberProfile();

                setFirstName(
                    member.firstName ?? "",
                );

                setLastName(
                    member.lastName ?? "",
                );

                setEmail(member.email);

                setMusicPreference(
                    member.preferences
                        .musicPreference ?? "",
                );
            } catch {
                // Guest booking is allowed.
                // Leave the fields empty.
            }
        };

        loadMemberPrefill();
    }, []);

    // ==============================
    // LOAD MASSAGES
    // ==============================

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
            }
        };

        loadMassages();
    }, []);

    // ==============================
    // SELECTED MASSAGE
    // ==============================

    const selectedMassage = useMemo(
        () =>
            massages.find(
                (massage) =>
                    massage._id === massageId,
            ),
        [massages, massageId],
    );

    // ==============================
    // AVAILABLE TIME SLOTS
    // ==============================

    const [timeSlots, setTimeSlots] =
        useState<string[]>([]);

    // ==============================
    // LOAD SELECTED MASSAGE DETAILS
    // ==============================

    useEffect(() => {
        const loadSelectedMassage =
            async () => {
                if (!selectedMassage) {
                    setSelectedMassageDetails(
                        null,
                    );
                    setDuration(null);
                    return;
                }

                try {
                    const data =
                        await getMassageBySlug(
                            selectedMassage.slug,
                        );

                    setSelectedMassageDetails(
                        data,
                    );
                } catch {
                    setSelectedMassageDetails(
                        null,
                    );

                    setError(
                        "Could not load massage details.",
                    );
                }
            };

        loadSelectedMassage();
    }, [selectedMassage]);

    // ==============================
    // LOAD AVAILABILITY
    // ==============================

    useEffect(() => {
        const loadAvailability =
            async () => {
                if (!date) {
                    setIsAvailable(null);
                    setAvailableStart("");
                    setAvailableEnd("");
                    setStartTime("");
                    return;
                }

                try {
                    const data =
                        await getAvailabilityByDate(
                            date,
                        );

                    setIsAvailable(
                        data.isAvailable,
                    );

                    setAvailableStart(
                        data.startTime ?? "",
                    );

                    setAvailableEnd(
                        data.endTime ?? "",
                    );

                    setStartTime("");
                } catch {
                    setIsAvailable(false);
                    setAvailableStart("");
                    setAvailableEnd("");
                    setStartTime("");
                }
            };

        loadAvailability();
    }, [date]);

    // ==============================
    // LOAD AVAILABLE TIME SLOTS
    // ==============================

    useEffect(() => {
        const loadAvailableSlots = async () => {
            if (
                !date ||
                !duration ||
                !isAvailable
            ) {
                setTimeSlots([]);
                setStartTime("");
                return;
            }
            
            try {
                const slots =
                    await getAvailableSlots(
                        date,
                        duration,
                    );
                    
                    setTimeSlots(slots);
                    setStartTime("");
                } catch {
                    setTimeSlots([]);
                    setStartTime("");
                    
                    setError(
                    "Could not load available times.",
                    );
                }
        };

        loadAvailableSlots();
    }, [date, duration, isAvailable]);

    // ==============================
    // SUBMIT BOOKING
    // ==============================

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        setMessage("");
        setError("");

        if (!duration) {
            setError(
                "Please choose a duration.",
            );
            return;
        }

        if (!startTime) {
            setError(
                "Please choose a start time.",
            );
            return;
        }

        try {
            const result =
                await createBooking({
                    contact: {
                        firstName,
                        lastName,
                        email,

                        ...(phone && {
                            phone,
                        }),
                    },

                    massageId,
                    date,
                    startTime,
                    duration,

                    ...(musicPreference && {
                        musicPreference,
                    }),

                    ...(notes && {
                        notes,
                    }),
                });

            setMessage(result.message);

            const updatedSlots =
                await getAvailableSlots(
                    date,
                    duration,
                );

            setTimeSlots(updatedSlots);
            setStartTime("");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not create booking.",
            );
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
                                booking
                            </p>

                            <h1 className="text-3xl font-light leading-tight md:text-5xl">
                                Choose your time.
                                <br />
                                Arrive as you are.
                            </h1>
                        </div>
                    </ScrollReveal>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-16"
                    >
                        {/* -------------------------
                            MASSAGE
                        ------------------------- */}

                        <section>
                            <p className="mb-5 text-sm tracking-wide">
                                Massage
                            </p>

                            <select
                                value={massageId}
                                onChange={(event) => {
                                    setMassageId(
                                        event.target.value,
                                    );

                                    setDuration(null);
                                    setStartTime("");
                                }}
                                required
                                className="w-full border-b border-current/20 bg-transparent py-3 outline-none"
                            >
                                <option value="">
                                    Choose a massage
                                </option>

                                {massages.map(
                                    (massage) => (
                                        <option
                                            key={
                                                massage._id
                                            }
                                            value={
                                                massage._id
                                            }
                                        >
                                            {
                                                massage.name
                                            }
                                        </option>
                                    ),
                                )}
                            </select>
                        </section>

                        {/* -------------------------
                            DURATION
                        ------------------------- */}

                        {selectedMassage && (
                            <section>
                                <p className="mb-5 text-sm tracking-wide">
                                    Duration
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    {selectedMassageDetails?.durationOptions.map(
                                        (option) => {
                                            const price =
                                                selectedMassageDetails
                                                    .prices[
                                                    String(
                                                        option,
                                                    )
                                                ];

                                            return (
                                                <button
                                                    key={
                                                        option
                                                    }
                                                    type="button"
                                                    onClick={() => {
                                                        setDuration(
                                                            option,
                                                        );

                                                        setStartTime(
                                                            "",
                                                        );
                                                    }}
                                                    className={`
                                                        rounded-full border px-5 py-2
                                                        text-sm transition-all duration-300
                                                        ${
                                                            duration ===
                                                            option
                                                                ? "border-current"
                                                                : "border-current/20 opacity-60"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        option
                                                    }{" "}
                                                    min

                                                    {price !==
                                                        undefined &&
                                                        ` · €${price}`}
                                                </button>
                                            );
                                        },
                                    )}
                                </div>
                            </section>
                        )}

                        {/* -------------------------
                            DATE
                        ------------------------- */}

                        <section>
                            <p className="mb-5 text-sm tracking-wide">
                                Date
                            </p>

                            <input
                                type="date"
                                value={date}
                                onChange={(event) =>
                                    setDate(
                                        event.target.value,
                                    )
                                }
                                required
                                className="border-b border-current/20 bg-transparent py-3 outline-none"
                            />

                            {date &&
                                isAvailable ===
                                    false && (
                                    <p
                                        className="mt-4 text-sm"
                                        style={{
                                            color:
                                                "var(--muted-text)",
                                        }}
                                    >
                                        This date is not
                                        available.
                                    </p>
                                )}

                            {isAvailable &&
                                availableStart &&
                                availableEnd && (
                                    <p
                                        className="mt-4 text-sm"
                                        style={{
                                            color:
                                                "var(--muted-text)",
                                        }}
                                    >
                                        Available{" "}
                                        {
                                            availableStart
                                        }
                                        –
                                        {availableEnd}
                                    </p>
                                )}
                        </section>

                        {/* -------------------------
                            TIME
                        ------------------------- */}

                        {isAvailable &&
                            duration && (
                                <section>
                                    <p className="mb-5 text-sm tracking-wide">
                                        Start time
                                    </p>

                                    <div className="flex flex-wrap gap-3">
                                        {timeSlots.map(
                                            (slot) => (
                                                <button
                                                    key={
                                                        slot
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                        setStartTime(
                                                            slot,
                                                        )
                                                    }
                                                    className={`
                                                        rounded-full border px-5 py-2
                                                        text-sm transition-all duration-300
                                                        ${
                                                            startTime ===
                                                            slot
                                                                ? "border-current"
                                                                : "border-current/20 opacity-60"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        slot
                                                    }
                                                </button>
                                            ),
                                        )}
                                    </div>

                                    {timeSlots.length ===
                                        0 && (
                                        <p
                                            className="mt-4 text-sm"
                                            style={{
                                                color:
                                                    "var(--muted-text)",
                                            }}
                                        >
                                            No suitable
                                            start times for
                                            this duration.
                                        </p>
                                    )}
                                </section>
                            )}

                        {/* -------------------------
                            CONTACT
                        ------------------------- */}

                        <section className="grid gap-8 md:grid-cols-2">
                            <input
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(event) =>
                                    setFirstName(
                                        event.target
                                            .value,
                                    )
                                }
                                required
                                className="border-b border-current/20 bg-transparent py-3 outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(event) =>
                                    setLastName(
                                        event.target
                                            .value,
                                    )
                                }
                                required
                                className="border-b border-current/20 bg-transparent py-3 outline-none"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target
                                            .value,
                                    )
                                }
                                required
                                className="border-b border-current/20 bg-transparent py-3 outline-none"
                            />

                            <input
                                type="tel"
                                placeholder="Phone (optional)"
                                value={phone}
                                onChange={(event) =>
                                    setPhone(
                                        event.target
                                            .value,
                                    )
                                }
                                className="border-b border-current/20 bg-transparent py-3 outline-none"
                            />
                        </section>

                        {/* -------------------------
                            SESSION PREFERENCES
                        ------------------------- */}

                        <section className="space-y-8">
                            <MusicPreferenceSelector
                                value={musicPreference}
                                onChange={setMusicPreference}
                            />

                            <textarea
                                placeholder="Anything you'd like me to know? (optional)"
                                value={notes}
                                onChange={(event) =>
                                    setNotes(
                                        event.target
                                            .value,
                                    )
                                }
                                rows={4}
                                className="w-full resize-none border border-current/15 bg-transparent p-4 outline-none"
                            />
                        </section>

                        {/* -------------------------
                            RESPONSE
                        ------------------------- */}

                        {message && (
                            <p
                                style={{
                                    color:
                                        "var(--accent)",
                                }}
                            >
                                {message}
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

                        <button
                            type="submit"
                            className="rounded-full border border-current/30 px-8 py-3 text-sm tracking-wide transition-opacity duration-300 hover:opacity-60"
                        >
                            Book session
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Booking;