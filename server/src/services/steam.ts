export class SteamApiError extends Error {
    constructor(
        public status: number,
        public body: string
    ) {
        super(`Steam returned ${status}`);
    }
}

export async function steamFetch(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new SteamApiError(
            response.status,
            await response.text()
        );
    }

    return response.json();
}