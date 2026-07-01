import type { ApiGameType } from "./ApiGameType";

export type GetOwnedGamesResponseType = {
    response: {
        game_count: number;
        games: ApiGameType[];
    }
}