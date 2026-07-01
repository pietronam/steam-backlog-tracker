import type { GameType } from "./gameType"
import type { UserType } from "./userType"

export interface SteamDataState {
    user: UserType,
    games: GameType[]
}