export type GameType = {
    appid: number,
    name: string,
    status: "finished" | "backlog" | "untracked",
    custom_tags: string[],
    game_info: {
        genres: {
            id: string,
            description: string,
        }[],
        short_description: string,
        developers: string[],
        publishers: string[],
        metacritic?: {
            score: number,
            url: string,
        },
    },
    custom_description: string,
}