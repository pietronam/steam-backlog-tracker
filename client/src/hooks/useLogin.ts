import { useEffect } from "react"
import { type UseQueryOptions, useQuery } from "@tanstack/react-query"
import { getUserData } from "../api/getUserData"
import { useSteamData } from "../context/SteamDataContext"
import type { userType } from "../types/userType"

export type UseLoginOptions = Omit<
    UseQueryOptions<
        userType,
        Error,
        userType,
        readonly ["login", string]
    >,
    "queryKey" | "queryFn"
>

export function useLogin(
    steamId: string,
    options?: UseLoginOptions,
) {
    const { setSteamUser } = useSteamData()

    const queryKey = ["login", steamId] as const

    const query = useQuery({
        queryKey,
        queryFn: () => getUserData(steamId),
        enabled: Boolean(steamId && (options?.enabled ?? true)),
        ...options,
    })

    useEffect(() => {
        if (query.data?.steamid && query.data.steamid) {
            setSteamUser(query.data)
        }
    }, [query.data, setSteamUser])

    return query
}