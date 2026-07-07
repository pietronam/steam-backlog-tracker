import { useMutation } from "@tanstack/react-query"
import { getUserGames } from "../api/getUserGames"
import { useSteamDataActions } from "../context/SteamDataContext"
import type { UserType } from "../types/userType"

export const useLogin = () => {
    const { login } = useSteamDataActions();

    return useMutation({
        mutationFn: async (user: UserType) => {
            const games = await getUserGames(user.steamid)

            return {
                user,
                games,
            }
        },

        onSuccess: ({ user, games }) => {
            login(user, games)
        },
    })
}