import type { GameType } from "./GameType"

export interface SteamDataState {
    steamid: number,
    games: GameType[]
}