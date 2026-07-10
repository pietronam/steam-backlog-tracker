import type { GameType } from "../types/gameType";

export type GameFilterState = {
  selectedGenres: number[];
  selectedCategories: number[];
  selectedDevelopers: string[];
  selectedPublishers: string[];
  selectedStatuses: GameType["status"][];
  selectedTags: string[];
};

export function filterGames(
  games: GameType[],
  query: string,
  filters: GameFilterState,
  genreMap: Record<number, string>,
  categoryMap: Record<number, string>,
): GameType[] {
  const normalizedQuery = query.trim().toLowerCase();

  return games.filter((game) => {
    const searchIndex =
      game.searchIndex ?? game.name.toLowerCase();
    const matchesText =
      normalizedQuery === "" || searchIndex.includes(normalizedQuery);

    const metadataTerms = [
      ...filters.selectedGenres.map((id) => genreMap[Number(id)]),
      ...filters.selectedCategories.map((id) => categoryMap[id]),
      ...filters.selectedDevelopers,
      ...filters.selectedPublishers,
      ...filters.selectedStatuses,
      ...filters.selectedTags,
    ].filter((value): value is string => Boolean(value));

    const matchesMetadata =
      metadataTerms.length === 0 ||
      metadataTerms.every((term) =>
        searchIndex.includes(term.toLowerCase()),
      );

    return matchesText && matchesMetadata;
  });
}