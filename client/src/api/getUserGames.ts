import type { GameType } from "../types/gameType"
import type { GetOwnedGamesResponseType } from "../types/responses/getOwnedGamesResponse"



export async function getUserGames(steamId: string): Promise<GameType[]> {
    try {
        const response = await fetch(`/api/games/${steamId}`)

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }

        const data = (await response.json()) as GetOwnedGamesResponseType

        if (!data?.response.games) {
            return []
        }

        const games: GameType[] = data.response.games.map((game) => {
            return {
                appid: game.appid,
                name: game.name,
                game_details: {
                    developers: [],
                    genres: [],
                    publishers: [],
                    short_description: "",
                    metacritic: {
                        score: 0,
                        url: ""
                    },
                },
                status: "untracked",
                custom_tags: [],
                custom_description: "",
            }
        })

        return games;
    } catch (error) {
        console.error("Failed to fetch user games:", error)
        return []
    }
}
