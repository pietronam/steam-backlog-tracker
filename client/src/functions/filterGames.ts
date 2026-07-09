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
): GameType[] {
  const normalizedQuery = query.trim().toLowerCase();

  return games.filter((game) => {
    const matchesText =
      !normalizedQuery ||
      game.name.toLowerCase().includes(normalizedQuery);

    const matchesGenres =
      filters.selectedGenres.length === 0 ||
      filters.selectedGenres.some((genreId) =>
        game.summary.genreIds.includes(genreId),
      );

    const matchesCategories =
      filters.selectedCategories.length === 0 ||
      filters.selectedCategories.some((categoryId) =>
        game.summary.categoryIds.includes(categoryId),
      );

    const matchesDevelopers =
      filters.selectedDevelopers.length === 0 ||
      filters.selectedDevelopers.some((developer) =>
        game.summary.developers.some((item) => item.toLowerCase() === developer.toLowerCase()),
      );

    const matchesPublishers =
      filters.selectedPublishers.length === 0 ||
      filters.selectedPublishers.some((publisher) =>
        game.summary.publishers.some((item) => item.toLowerCase() === publisher.toLowerCase()),
      );

    const matchesStatuses =
      filters.selectedStatuses.length === 0 ||
      filters.selectedStatuses.includes(game.status);

    const matchesTags =
      filters.selectedTags.length === 0 ||
      filters.selectedTags.every((tag) =>
        game.custom_tags.some((item) => item.toLowerCase() === tag.toLowerCase()),
      );

    const matchesMetadata =
      matchesGenres &&
      matchesCategories &&
      matchesDevelopers &&
      matchesPublishers &&
      matchesStatuses &&
      matchesTags;

    return matchesText && matchesMetadata;
  });
}
