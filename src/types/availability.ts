export type EffectiveAvailability = {
    date: string;
    source: "weekly" | "exception";
    isAvailable: boolean;
    startTime?: string;
    endTime?: string;
};