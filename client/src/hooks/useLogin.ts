import { useMutation } from "@tanstack/react-query"
import { useSteamData } from "../context/SteamDataContext"
import { getUserGames } from "../api/getUserGames"
import type { userType } from "../types/userType"

export const useLogin = () => {
    const { setSession } = useSteamData()

    return useMutation({
        mutationFn: async (user: userType) => {
            const games = await getUserGames(user.steamid)

            return {
                user,
                games,
            }
        },

        onSuccess: ({ user, games }) => {
            setSession(user, games)
        },
    })
}