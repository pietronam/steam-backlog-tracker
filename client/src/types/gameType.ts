export type GameType = {
    appid: number,
    name: string,
    status: "completed" | "backlog" | "untracked",
    custom_tags: string[],
    game_details: {
        genres: {
            id: string,
            description: string,
        }[],
        short_description: string,
        developers: string[],
        publishers: string[],
        metacritic: {
            score: number,
            url: string,
        },
    },
    custom_description: string,
}