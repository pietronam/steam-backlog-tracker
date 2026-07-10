export function buildSearchIndex(game: {
    name: string;
    genres?: string[];
    categories?: string[];
    developers?: string[];
    publishers?: string[];
    status?: string;
    customTags?: string[];
    customNotes?: string;
}) {
    return [
        game.name,
        ...(game.genres ?? []),
        ...(game.categories ?? []),
        ...(game.developers ?? []),
        ...(game.publishers ?? []),
        ...(game.customTags ?? []),
        game.status,
        game.customNotes,
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
}