import type { GameType } from "./gameType"
import type { userType } from "./userType"

export interface SteamDataState {
    user: userType,
    games: GameType[]
}