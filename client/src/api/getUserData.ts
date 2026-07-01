import type { UserType } from "../types/userType"
import type { getPlayerSummariesResponse } from "../types/responses/getPlayerSummariesResponse"

export const emptyUser: UserType = {
    steamid: "",
    username: "",
    profileurl: "",
    avatar: "",
    avatarmedium: "",
    avatarfull: "",
    personastate: 0,
}

export async function getUserData(steamId: string): Promise<UserType> {
    try {
        const response = await fetch(`/api/player/${steamId}`)

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }

        const data = (await response.json()) as getPlayerSummariesResponse
        const player = data?.response.players?.[0]

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
