import { API_URL } from "./api";
import type { MassageSummary } from "../types/massage";

type MassageResponse = {
    results: MassageSummary[];
};

export async function getMassages(): Promise<MassageSummary[]> {
    const response = await fetch(
        `${API_URL}/api/massages`,
    );

    if (!response.ok) {
        throw new Error(
            "Failed to load massages",
        );
    }

    const data =
        (await response.json()) as MassageResponse;

    return data.results;
}