import { API_URL } from "./api";
import type {
    BookingInput,
    BookingResponse,
    MemberBooking,
    MemberBookingsResponse,
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


// ==============================
// GET MY BOOKINGS
// ==============================

export async function getMyBookings(): Promise<
    MemberBooking[]
> {
    const response = await fetch(
        `${API_URL}/api/bookings/me`,
        {
            credentials: "include",
        },
    );

    const data =
        (await response.json()) as MemberBookingsResponse;

    if (!response.ok) {
        throw new Error(
            "Could not load your bookings.",
        );
    }

    return data.results;
}


// ==============================
// CANCEL BOOKING
// ==============================

export async function cancelBooking(
    id: string,
): Promise<MemberBooking> {
    const response = await fetch(
        `${API_URL}/api/bookings/${id}/cancel`,
        {
            method: "PATCH",
            credentials: "include",
        },
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
                "Could not cancel booking.",
        );
    }

    return data.booking as MemberBooking;
}