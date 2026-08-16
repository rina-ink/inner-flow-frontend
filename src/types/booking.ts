export type BookingInput = {
    contact: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
    };

    massageId: string;
    date: string;
    startTime: string;
    duration: number;

    musicPreference?: string;
    notes?: string;
};

export type BookingResponse = {
    message: string;
    booking: {
        _id: string;
        userId: string | null;
        massageId: string;
        date: string;
        startTime: string;
        duration: number;
        status: "confirmed" | "cancelled" | "completed";
    };
};


export type MemberBooking = {
    _id: string;

    userId: string | null;

    contact: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
    };

    massageId: {
        _id: string;
        name: string;
        slug: string;
    };

    date: string;
    startTime: string;
    duration: number;

    musicPreference?: string;
    notes?: string;

    status:
        | "confirmed"
        | "cancelled"
        | "completed";

    createdAt: string;
};

export type MemberBookingsResponse = {
    results: MemberBooking[];
};