import { useMutation } from "@tanstack/react-query"
import { useSteamData } from "../context/SteamDataContext"
import { getUserGames } from "../api/getUserGames"
import type { UserType } from "../types/userType"

export const useLogin = () => {
    const { setSession } = useSteamData()

    return useMutation({
        mutationFn: async (user: UserType) => {
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