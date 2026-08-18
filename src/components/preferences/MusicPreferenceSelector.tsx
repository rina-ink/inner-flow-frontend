import { useRef, useState } from "react";

type MusicPreferenceSelectorProps = {
    value: string | null;
    onChange: (value: string) => void;
};

const MUSIC_OPTIONS = [
    {
        value: "adriatic-summer",
        label: "Adriatic Summer",
        description:
            "crickets · warm evening · 0:30",
        audioSrc: "/audio/crickets.m4a",
    },
    {
        value: "soft-water",
        label: "Soft Water",
        description:
            "water · gentle movement · 0:29",
        audioSrc: "/audio/water.wav",
    },
    {
        value: "quiet",
        label: "Quiet",
        description: "no music",
        audioSrc: null,
    },
];

function MusicPreferenceSelector({
    value,
    onChange,
}: MusicPreferenceSelectorProps) {
    const audioRef =
        useRef<HTMLAudioElement | null>(null);

    const [playingValue, setPlayingValue] =
        useState<string | null>(null);

    const handlePreview = async (
        optionValue: string,
        audioSrc: string,
    ) => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        if (playingValue === optionValue) {
            audio.pause();
            audio.currentTime = 0;

            setPlayingValue(null);
            return;
        }

        audio.pause();
        audio.currentTime = 0;

        audio.src = audioSrc;

        try {
            await audio.play();

            setPlayingValue(optionValue);
        } catch (error) {
            console.error(
                "Could not play audio preview:",
                error,
            );

            setPlayingValue(null);
        }
    };

    const handleAudioEnded = () => {
        setPlayingValue(null);
    };

    return (
        <div>
            <audio
                ref={audioRef}
                preload="metadata"
                onEnded={handleAudioEnded}
            />

            <p className="mb-5 text-sm tracking-wide">
                Music
            </p>

            <div className="grid gap-4 md:grid-cols-3">
                {MUSIC_OPTIONS.map((option) => {
                    const isSelected =
                        value === option.value;

                    const isPlaying =
                        playingValue ===
                        option.value;

                    return (
                        <div
                            key={option.value}
                            className={`
                                rounded-3xl border p-5
                                transition-all duration-300
                                ${
                                    isSelected
                                        ? "border-current"
                                        : "border-current/15 opacity-60 hover:opacity-100"
                                }
                            `}
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    onChange(
                                        option.value,
                                    )
                                }
                                className="w-full text-left"
                            >
                                <span className="block text-lg">
                                    {option.label}
                                </span>

                                <span
                                    className="mt-2 block text-sm leading-6"
                                    style={{
                                        color:
                                            "var(--muted-text)",
                                    }}
                                >
                                    {
                                        option.description
                                    }
                                </span>
                            </button>

                            {option.audioSrc && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handlePreview(
                                            option.value,
                                            option.audioSrc,
                                        )
                                    }
                                    className="mt-5 text-xs tracking-[0.15em] transition-opacity duration-300 hover:opacity-50"
                                >
                                    {isPlaying
                                        ? "■ stop"
                                        : "▶ preview"}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MusicPreferenceSelector;