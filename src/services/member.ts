import { API_URL } from "./api";

import type {
    MemberProfile,
    UpdateMemberPreferencesInput,
    UpdateMemberPreferencesResponse,
} from "../types/member";

// ==============================
// GET MY MEMBER PROFILE
// ==============================

export async function getMyMemberProfile(): Promise<MemberProfile> {
    const response = await fetch(
        `${API_URL}/api/members/me`,
        {
            credentials: "include",
        },
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
                "Could not load member profile.",
        );
    }

    return data as MemberProfile;
}

// ==============================
// UPDATE MY PREFERENCES
// ==============================

export async function updateMyPreferences(
    input: UpdateMemberPreferencesInput,
): Promise<UpdateMemberPreferencesResponse> {
    const response = await fetch(
        `${API_URL}/api/members/me/preferences`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
            },

            credentials: "include",

            body: JSON.stringify(input),
        },
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
                "Could not update preferences.",
        );
    }

    return data as UpdateMemberPreferencesResponse;
}