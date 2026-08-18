import { API_URL } from "./api";
import type { EffectiveAvailability } from "../types/availability";

export async function getAvailabilityByDate(
    date: string,
): Promise<EffectiveAvailability> {
    const response = await fetch(
        `${API_URL}/api/availability/date/${date}`,
    );
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(
            data.message || "Could not load availability",
        );
    }

    return data as EffectiveAvailability;
}

export async function getAvailableSlots(
    date: string,
    duration: number,
): Promise<string[]> {
    const response = await fetch(
        `${API_URL}/api/availability/slots?date=${date}&duration=${duration}`,
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
                "Could not load available times.",
        );
    }

    return data.slots;
}