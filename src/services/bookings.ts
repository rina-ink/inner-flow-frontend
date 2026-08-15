import { API_URL } from "./api";
import type {
    BookingInput,
    BookingResponse,
} from "../types/booking";

export async function createBooking(
    booking: BookingInput,
): Promise<BookingResponse> {
    const response = await fetch(
        `${API_URL}/api/bookings`,
        {
            method: "POST",

            headers: {
                        "Content-Type": "application/json",
            },

            credentials: "include",

            body: JSON.stringify(booking),
        },
    );

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(
            data.message || "Could not create booking",
        );
    }

    return data as BookingResponse;
}