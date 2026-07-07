export type GameSummaryType = {
    genreIds: number[],
    categoryIds: number[],
    developers: string[],
    publishers: string[],
    metacritic: {
        score: number,
        url: string,
    },
}