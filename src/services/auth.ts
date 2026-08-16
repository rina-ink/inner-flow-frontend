import { API_URL } from "./api";

import type {
    AuthResponse,
    LoginInput,
    RegisterInput,
    User,
} from "../types/auth";

export async function register(
    input: RegisterInput,
): Promise<AuthResponse> {
    const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
            method: "POST",

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
            data.message || "Could not register.",
        );
    }

    return data as AuthResponse;
}

export async function login(
    input: LoginInput,
): Promise<AuthResponse> {
    const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
            method: "POST",

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
            data.message || "Could not log in.",
        );
    }

    return data as AuthResponse;
}

export async function logout(): Promise<void> {
    const response = await fetch(
        `${API_URL}/api/auth/logout`,
        {
            method: "DELETE",
            credentials: "include",
        },
    );

    if (!response.ok) {
        const data = await response.json();

        throw new Error(
            data.message || "Could not log out.",
        );
    }
}

export async function getMe(): Promise<User> {
    const response = await fetch(
        `${API_URL}/api/auth/me`,
        {
            credentials: "include",
        },
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Not authenticated.",
        );
    }

    return data as User;
}