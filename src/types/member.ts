export type MemberPreferences = {
    musicPreference: string | null;
    quieterSession: boolean;
};

export type MemberProfile = {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    preferences: MemberPreferences;
};

export type UpdateMemberPreferencesInput = {
    musicPreference?: string | null;
    quieterSession?: boolean;
};

export type UpdateMemberPreferencesResponse = {
    message: string;
    preferences: MemberPreferences;
};