import type { userType } from "../types/userType"
import type { getPlayerSummariesResponse } from "../types/responses/getPlayerSummariesResponse"

export const emptyUser: userType = {
    steamid: 0,
    username: "",
    profileurl: "",
    avatar: "",
    avatarmedium: "",
    avatarfull: "",
    personastate: 0,
}

export async function getUserData(apiKey: string, steamId: string): Promise<userType> {
    try {
        const response = await fetch(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`
        )

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }

        const data = (await response.json()) as getPlayerSummariesResponse
        const player = data?.players?.[0]

        if (!player) {
            return emptyUser
        }

        return {
            steamid: Number(player.steamid),
            username: player.personaname,
            profileurl: player.profileurl,
            avatar: player.avatar,
            avatarmedium: player.avatarmedium,
            avatarfull: player.avatarfull,
            personastate: player.personastate,
        }
    } catch (error) {
        console.error("Failed to fetch user data:", error)
        return emptyUser
    }
}
