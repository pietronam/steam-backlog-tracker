import type { SteamDataState } from "../types/steamDataState";

export async function importData(
    file: File
): Promise<SteamDataState> {
    const text = await file.text();

    const data = JSON.parse(text);

    // Basic validation
    if (
        !data ||
        typeof data !== "object" ||
        !("user" in data) ||
        !("games" in data) ||
        !("genreMap" in data) ||
        !("categoryMap" in data) ||
        !("developers" in data) ||
        !("publishers" in data)
    ) {
        throw new Error("Invalid Steam Backlog export.");
    }

    return data as SteamDataState;
}