import { type UseQueryOptions, useQuery } from "@tanstack/react-query"
import { getGameDetails } from "../api/getGameDetails"
import type { GameDetailsType } from "../types/gameDetailsType"

export type useGameDetailsOptions = Omit<
    UseQueryOptions<
        GameDetailsType,
        Error,
        GameDetailsType,
        readonly ["gameDetails", number]
    >,
    "queryKey" | "queryFn"
>

export function useGameDetails(appId: number, options?: useGameDetailsOptions) {
    const queryKey = ["gameDetails", appId] as const

        const query = useQuery({
            queryKey,
            queryFn: () => getGameDetails(appId),
            enabled: Boolean(appId && (options?.enabled ?? true)),
            ...options,
        })

    return query
}
