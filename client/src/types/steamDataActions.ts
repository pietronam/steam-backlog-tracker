import type { GameMetadataType } from "./gameMetadataType";
import type { GameType } from "./gameType";
import type { UserType } from "./userType";

export type SteamDataActions = {
    setSteamUser: (user: UserType) => void;
    login: (user: UserType, games: GameType[]) => void;
    setSession: (
        user: UserType,
        games: GameType[],
        genreMap: Record<number, string>,
        categoryMap: Record<number, string>,
        developers: string[],
        publishers: string[],
    ) => void;
    addGames: (games: GameType[]) => void;
    removeGames: (appIds: number[]) => void;
    addLookups: (
        developers: string[],
        publishers: string[],
        genres?: {
            id: string;
            description: string;
        }[],
        categories?: {
            id: number;
            description: string;
        }[],
    ) => void;
    addCustomTag: (appId: number, tag: string) => void;
    removeCustomTag: (appId: number, tag: string) => void;
    addCustomNotes: (appId: number, notes: string) => void;
    changeGameStatus: (
        appId: number,
        status: GameType["status"],
    ) => void;
    updateGameMetadata: (appId: number, metadata: GameMetadataType) => void;
    clearData: () => void;
};
