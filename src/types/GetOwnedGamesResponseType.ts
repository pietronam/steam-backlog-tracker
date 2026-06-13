import type { ApiGameType } from "./ApiGameType";

export type GetOwnedGamesResponseType = {
    game_count: number;
    games: ApiGameType[];
    
}