import { getUserGames } from "../api/getUserGames";
import type { GameType } from "../types/gameType";

export const importLibrary = async (steamid: string, addGames: (mappedGames: GameType[]) => void) => {
    try {
        const importedGames = await getUserGames(steamid);
        const mappedGames = importedGames.map((game) => ({
            ...game,
        }));

        addGames(mappedGames);
    } catch (err) {
        console.error(err);
        alert("We couldn't import your library from Steam.");
    }
};
