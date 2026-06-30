import type { userType } from "../types/userType"
import type { getPlayerSummariesResponse } from "../types/responses/getPlayerSummariesResponse"

export const emptyUser: userType = {
    steamid: "",
    username: "",
    profileurl: "",
    avatar: "",
    avatarmedium: "",
    avatarfull: "",
    personastate: 0,
}

export async function getUserData(steamId: string): Promise<userType> {
    try {
        const response = await fetch(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=1C9C70A0772D3741F66AA91BA733CE7E&steamids=${steamId}`
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
            steamid: player.steamid,
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
