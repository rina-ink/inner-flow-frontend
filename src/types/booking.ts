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