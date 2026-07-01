import { type UseQueryOptions, useQuery } from "@tanstack/react-query"
import { getUserData } from "../api/getUserData"
import type { userType } from "../types/userType"

export type useGetUserDataOptions = Omit<
    UseQueryOptions<
        userType,
        Error,
        userType,
        readonly ["login", string]
    >,
    "queryKey" | "queryFn"
>

export function useGetUserData(
    steamId: string,
    options?: useGetUserDataOptions,
) {
    const queryKey = ["login", steamId] as const

    const query = useQuery({
        queryKey,
        queryFn: () => getUserData(steamId),
        enabled: Boolean(steamId && (options?.enabled ?? true)),
        ...options,
    })
    return query
}