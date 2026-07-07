import type { GameDetailsType } from "../types/gameDetailsType"
import type { GetAppDetailsResponseType } from "../types/responses/getAppDetailsResponse"

const emptyGameDetails: GameDetailsType = {
    header_image: "",
    genres: [],
    categories: [],
    about_the_game: "",
    developers: [],
    publishers: [],
    metacritic: {
        score: 0,
        url: "",
    },
    pc_requirements: {
        minimum: "",
        required: "",
    },
    website: "",
    price_overview: {
        currency: "",
        discount_percent: 0,
        initial_formatted: "",
        final_formatted: "",
    },
    dlc: [],
}

export async function getGameDetails(appId: number): Promise<GameDetailsType> {
    try {
        const response = await fetch(`/api/games/detail/${appId}`)

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }

        const data = (await response.json()) as GetAppDetailsResponseType
        const gameData = data?.[Number(appId)]?.data

        if (!gameData) {
            return emptyGameDetails
        }

        const gameDetails: GameDetailsType = {
            header_image: gameData.header_image,
            genres: gameData.genres?.map((genre) => ({
                id: genre.id.toString(),
                description: genre.description,
            })) ?? [],
            categories: gameData.categories?.map((category) => ({
                id: category.id,
                description: category.description,
            })) ?? [],
            about_the_game: gameData.about_the_game ?? "",
            developers: gameData.developers ?? [],
            publishers: gameData.publishers ?? [],
            metacritic: {
                score: gameData.metacritic?.score ?? 0,
                url: gameData.metacritic?.url ?? "",
            },
            pc_requirements: {
                minimum: gameData.pc_requirements?.minimum ?? "",
                required: gameData.pc_requirements?.required ?? "",
            },
            website: gameData.website ?? "",
            price_overview: {
                currency: gameData.price_overview?.currency ?? "",
                discount_percent: gameData.price_overview?.discount_percent ?? 0,
                initial_formatted: gameData.price_overview?.initial_formatted ?? "",
                final_formatted: gameData.price_overview?.final_formatted ?? "",
            },
            dlc: gameData.dlc ?? [],

        }

        return gameDetails;
    } catch (error) {
        console.error("Failed to fetch game details:", error)
        return emptyGameDetails
    }
}
